import Stripe from "stripe";
import { Database } from "@/Database";
import { Price, Product } from "@/Interfaces";
import { createClient } from "@supabase/supabase-js";
import { STRIPE } from "./useStripe";

const ISO1 = (time: number | null | undefined): string | undefined => {
  if (time === null || time === undefined) {
    return;
  }

  const DATE = new Date("1970-01-01T00:30:00Z");
  DATE.setSeconds(time);
  return DATE.toISOString();
};

const ISO2 = (time: number | null | undefined): string | null =>
  ISO1(time) ?? null;

export const ADMIN = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "",
);

const upProduct = async (product: Stripe.Product) => {
  const productData: Product = {
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description ?? undefined,
    image: product.images?.[0] ?? null,
    metadata: product.metadata,
  };

  const { error } = await ADMIN.from("products").upsert([productData]);
  if (error) throw error;
};

const upPrice = async (price: Stripe.Price) => {
  const priceData: Price = {
    id: price.id,
    product_id: typeof price.product === "string" ? price.product : "",
    active: price.active,
    currency: price.currency,
    description: price.nickname ?? undefined,
    type: price.type,
    unit_amount: price.unit_amount ?? undefined,
    interval: price.recurring?.interval,
    interval_count: price.recurring?.interval_count,
    trial_period_days: price.recurring?.trial_period_days,
    metadata: price.metadata,
  };

  const { error } = await ADMIN.from("prices").upsert([priceData]);
  if (error) throw error;
};

type setOrGetUserProps = { email: string; uuid: string };
const setOrGetUser = async ({ email, uuid }: setOrGetUserProps) => {
  const { data, error } = await ADMIN.from("customers")
    .select("stripe_customer_id")
    .eq("id", uuid)
    .single();

  if (error || !data?.stripe_customer_id) {
    const customerData: { metadata: { supabaseUUID: string }; email?: string } =
      { metadata: { supabaseUUID: uuid } };

    if (email) customerData.email = email;
    const customer = await STRIPE.customers.create(customerData);

    const { error: supabaseError } = await ADMIN.from("customers").insert([
      { id: uuid, stripe_customer_id: customer.id },
    ]);

    if (supabaseError) throw supabaseError;
    return customer.id;
  }
  return data.stripe_customer_id;
};

const copyBillToUser = async (
  uuid: string,
  payment_method: Stripe.PaymentMethod,
) => {
  const customer = payment_method.customer as string;
  const { name, phone, address } = payment_method.billing_details;
  if (!name || !phone || !address) return;

  //@ts-ignore
  await STRIPE.customers.update(customer, { name, phone, address });

  const { error } = await ADMIN.from("users")
    .update({
      billing_address: { ...address },
      payment_method: { ...payment_method[payment_method.type] },
    })
    .eq("id", uuid);
  if (error) throw error;
};

const manageSubChange = async (
  subscriptionId: string,
  customerId: string,
  createAction = false,
) => {
  const { data: customerData, error: noCustomerError } = await ADMIN.from(
    "customers",
  )
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single();

  if (noCustomerError) throw noCustomerError;

  const { id: uuid } = customerData!;

  const subscription = await STRIPE.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method"],
  });

  const subscriptionData: Database["public"]["Tables"]["subscriptions"]["Insert"] =
    {
      id: subscription.id,
      user_id: uuid,
      metadata: subscription.metadata,
      // @ts-ignore
      status: subscription.status,
      price_id: subscription.items.data[0].price.id,
      // @ts-ignore
      quantity: subscription.quantity,
      cancel_at_period_end: subscription.cancel_at_period_end,
      cancel_at: ISO2(subscription.cancel_at),
      canceled_at: ISO2(subscription.canceled_at),
      current_period_start: ISO1(subscription.current_period_start),
      current_period_end: ISO1(subscription.current_period_end),
      created: ISO1(subscription.created),
      ended_at: ISO2(subscription.ended_at),
      trial_start: ISO2(subscription.trial_start),
      trial_end: ISO2(subscription.trial_end),
    };

  const { error } = await ADMIN.from("subscriptions").upsert([
    subscriptionData,
  ]);
  if (error) throw error;

  if (createAction && subscription.default_payment_method && uuid)
    //@ts-ignore
    await copyBillToUser(
      uuid,
      subscription.default_payment_method as Stripe.PaymentMethod,
    );
};

export { upProduct, upPrice, setOrGetUser, manageSubChange };

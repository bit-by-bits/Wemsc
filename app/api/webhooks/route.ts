import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { STRIPE } from "@/utils/useStripe";
import { manageSubChange, upPrice, upProduct } from "@/utils/useAdmin";

const EVENT_TYPES = {
  PRODUCT_CREATED: "product.created",
  PRODUCT_UPDATED: "product.updated",
  PRICE_CREATED: "price.created",
  PRICE_UPDATED: "price.updated",
  CHECKOUT_COMPLETED: "checkout.session.completed",
  SUBSCRIPTION_CREATED: "customer.subscription.created",
  SUBSCRIPTION_UPDATED: "customer.subscription.updated",
  SUBSCRIPTION_DELETED: "customer.subscription.deleted",
};

const relevantEvents = new Set(Object.values(EVENT_TYPES));

export async function POST(request: Request) {
  const BODY = await request.text();
  const SIGN = headers().get("Stripe-Signature");

  let EVENT: Stripe.Event;
  const SECRET =
    process.env.STRIPE_WEBHOOK_SECRET_LIVE ?? process.env.STRIPE_WEBHOOK_SECRET;

  try {
    if (!SIGN || !SECRET) return;
    EVENT = STRIPE.webhooks.constructEvent(BODY, SIGN, SECRET);
  } catch (err: any) {
    console.log(err);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (relevantEvents.has(EVENT.type)) {
    try {
      switch (EVENT.type) {
        case EVENT_TYPES.PRODUCT_CREATED:
        case EVENT_TYPES.PRODUCT_UPDATED:
          await upProduct(EVENT.data.object as Stripe.Product);
          break;
        case EVENT_TYPES.PRICE_CREATED:
        case EVENT_TYPES.PRICE_UPDATED:
          await upPrice(EVENT.data.object as Stripe.Price);
          break;
        case EVENT_TYPES.SUBSCRIPTION_CREATED:
        case EVENT_TYPES.SUBSCRIPTION_UPDATED:
        case EVENT_TYPES.SUBSCRIPTION_DELETED:
          const subscription = EVENT.data.object as Stripe.Subscription;
          await manageSubChange(
            subscription.id,
            subscription.customer as string,
            EVENT.type === EVENT_TYPES.SUBSCRIPTION_CREATED,
          );
          break;
        case EVENT_TYPES.CHECKOUT_COMPLETED:
          const checkoutSession = EVENT.data.object as Stripe.Checkout.Session;
          if (checkoutSession.mode === "subscription") {
            const subscriptionId = checkoutSession.subscription;
            await manageSubChange(
              subscriptionId as string,
              checkoutSession.customer as string,
              true,
            );
          }
          break;
        default:
          throw new Error("Unhandled Event!");
      }
    } catch (error) {
      console.log(error);
      return new NextResponse(
        'Webhook Error: "Webhook handler failed. View logs."',
        { status: 400 },
      );
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

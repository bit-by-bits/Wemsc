import Stripe from "stripe";
import { loadStripe, Stripe as StripeType } from "@stripe/stripe-js";

let stripePromise: Promise<StripeType | null>;

const STRIPE = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2023-10-16",
  appInfo: { name: "Wemsc", version: "0.1.0" },
});

const fetchSTRIPE = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
    );
  }

  return stripePromise;
};

export { STRIPE, fetchSTRIPE };

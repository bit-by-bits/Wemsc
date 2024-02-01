import urls from "@/URL";
import { fetchURL } from "@/utils/useAPI";
import { setOrGetUser } from "@/utils/useAdmin";
import { STRIPE } from "@/utils/useStripe";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { price, quantity = 1, metadata = {} } = await request.json();

  try {
    const URL = fetchURL();
    const SUPABASE = createRouteHandlerClient({ cookies });

    const {
      data: { user },
    } = await SUPABASE.auth.getUser();

    const USER = await setOrGetUser({
      uuid: user?.id || "",
      email: user?.email || "",
    });

    const SESSION = await STRIPE.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      customer: USER,
      line_items: [{ price: price.id, quantity }],
      mode: "subscription",
      allow_promotion_codes: true,
      subscription_data: { metadata: metadata },
      success_url: urls.PROFILE,
      cancel_url: urls.HOME,
    });

    return NextResponse.json({ sessionId: SESSION.id });
  } catch (err: any) {
    console.log(err);
    return new NextResponse("Internal Error: ", { status: 500 });
  }
}

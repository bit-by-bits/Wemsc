import urls from "@/URL";
import { fetchURL } from "@/utils/useAPI";
import { setOrGetUser } from "@/utils/useAdmin";
import { STRIPE } from "@/utils/useStripe";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const URL = fetchURL();
    const SUPABASE = createRouteHandlerClient({ cookies });

    const {
      data: { user },
    } = await SUPABASE.auth.getUser();
    if (!user) throw Error("User Not Found");

    const customer = await setOrGetUser({
      uuid: user.id || "",
      email: user.email || "",
    });
    if (!customer) throw Error("Customer Not Found");

    const { url } = await STRIPE.billingPortal.sessions.create({
      customer: customer,
      return_url: `${URL}${urls.PROFILE}`,
    });

    return NextResponse.json({ url });
  } catch (err: any) {
    console.log(err);
    new NextResponse("Internal Error: ", { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function POST(request: Request) {
  try {
    const subscription = await request.json();

    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });

    const { error } = await supabase.from("subscriptions").insert([
      {
        endpoint: subscription.endpoint,
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
      },
    ]);

    if (error) {
      console.error("Failed to save subscription:", error);
      return NextResponse.json(
        { message: "Failed to save subscription", error },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Subscription saved" });
  } catch (error) {
    console.error("Error processing subscription:", error);
    return NextResponse.json(
      { message: "Failed to process subscription", error },
      { status: 500 }
    );
  }
}

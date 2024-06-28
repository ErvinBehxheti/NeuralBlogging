import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const subscription = await request.json();

  const { error } = await supabase
    .from("subscriptions")
    .delete()
    .match({ endpoint: subscription.endpoint });

  if (error) {
    return NextResponse.json(
      { message: "Failed to remove subscription", error },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Subscription removed" });
}

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
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

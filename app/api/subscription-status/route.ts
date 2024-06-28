import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { endpoint } = await req.json();

  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("endpoint")
      .eq("endpoint", endpoint)
      .single();

    if (error && error.code !== "PGRST001") {
      console.error("Error fetching subscription status:", error);
      return NextResponse.json(
        {
          error: "Error fetching subscription status",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        subscribed: !!data,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      {
        error: "Unexpected error",
      },
      {
        status: 500,
      }
    );
  }
}

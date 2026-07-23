import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const clerkUser = await currentUser();

    const email =
      clerkUser?.emailAddresses[0]?.emailAddress ?? "";

    // Check if the user already exists
    const { data: existingUser, error: selectError } =
      await supabaseAdmin
        .from("users")
        .select("*")
        .eq("clerk_user_id", userId)
        .maybeSingle();

    if (selectError) {
      throw selectError;
    }

    if (!existingUser) {
      // Create the user
      const { error: insertError } =
        await supabaseAdmin
          .from("users")
          .insert({
            clerk_user_id: userId,
            email,
            subscription_status: "inactive",
            plan: "none",
          });

      if (insertError) {
        throw insertError;
      }
    } else {
      // Keep email updated
      await supabaseAdmin
        .from("users")
        .update({
          email,
        })
        .eq("clerk_user_id", userId);
    }

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.error("Sync User Error:", err);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
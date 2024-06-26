import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import webpush from "web-push";

export const sendPushNotifications = async (
  title: string,
  content: string,
  titleSearch: string
) => {
  const supabase = createServerComponentClient({ cookies: () => cookies() });

  const { data: subscriptions, error } = await supabase
    .from("subscriptions")
    .select("endpoint, p256dh, auth");

  if (error) {
    console.error("Error fetching subscriptions", error);
    return;
  }

  if (subscriptions && subscriptions.length > 0) {
    webpush.setVapidDetails(
      "mailto:ervinbehxheti05@gmail.com",
      process.env.NEXT_PUBLIC_VAPID_KEY!,
      process.env.PRIVATE_VAPID_KEY!
    );

    const notificationPayload = {
      notification: {
        title: "New Blog Post",
        body: `${title}\n\n${content}`,
        icon: "/logo/logo-384.png",
        vibrate: [100, 50, 100],
        data: {
          url: `/${titleSearch}`,
        },
      },
    };

    subscriptions.forEach(async (subscription) => {
      const { endpoint, p256dh, auth } = subscription;
      const pushSubscription = {
        endpoint,
        keys: {
          p256dh,
          auth,
        },
      };

      try {
        await webpush.sendNotification(
          pushSubscription,
          JSON.stringify(notificationPayload)
        );
      } catch (error) {
        console.error("Error sending notification", error);
      }
    });
  }
};

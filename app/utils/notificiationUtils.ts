const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export const fetchSubscriptionStatus = async (): Promise<boolean> => {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      const { endpoint } = subscription;
      const response = await fetch("/api/subscription-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ endpoint }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.subscribed;
      }
    }
  }
  return false;
};

export const subscribeUserToPush = async (
  registration: ServiceWorkerRegistration
) => {
  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_KEY as string;
  const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

  try {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey,
    });
    return subscription;
  } catch (error) {
    console.error("Failed to subscribe the user: ", error);
    throw error;
  }
};

export const saveSubscription = async (subscription: PushSubscription) => {
  const response = await fetch("/api/save-subscription", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to save subscription on server");
  }

  return response.json();
};

export const removeSubscription = async (subscription: PushSubscription) => {
  const response = await fetch("/api/remove-subscription", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to remove subscription on server");
  }

  return response.json();
};

export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    try {
      const registration = await navigator.serviceWorker.register(
        "/service-worker.js"
      );
      const subscription = await subscribeUserToPush(registration);
      await saveSubscription(subscription);
    } catch (error) {
      console.error("Service Worker Error:", error);
    }
  } else {
    console.warn("Push messaging is not supported");
  }
};

export const disableNotifications = async () => {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      await subscription.unsubscribe();
      await removeSubscription(subscription);
    }
  }
};

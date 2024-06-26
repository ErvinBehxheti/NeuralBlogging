"use client";
import { useLayoutEffect, useState, useCallback } from "react";
import TooltipIcon from "../TooltipIcon";
import {
  disableNotifications,
  fetchSubscriptionStatus,
  registerServiceWorker,
} from "@/app/utils/notificiationUtils";

const NotificationBell = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const debounce = (func: (...args: any[]) => void, timeout: number = 300) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), timeout);
    };
  };

  useLayoutEffect(() => {
    const checkSubscriptionStatus = async () => {
      const status = await fetchSubscriptionStatus();
      setNotificationsEnabled(status);
    };
    checkSubscriptionStatus();
  }, []);

  const handleNotificationToggle = useCallback(
    debounce(async () => {
      if (notificationsEnabled) {
        await disableNotifications();
        setNotificationsEnabled(false);
      } else {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          await registerServiceWorker();
          setNotificationsEnabled(true);
        }
      }
    }, 300),
    [notificationsEnabled]
  );

  return (
    <button
      onClick={handleNotificationToggle}
      className="text-white hover:text-[#6A0DAD] focus:outline-none"
      aria-label={
        notificationsEnabled ? "Disable Notifications" : "Enable Notifications"
      }
    >
      {notificationsEnabled ? (
        <TooltipIcon
          src="/icons/bell-on.svg"
          width={24}
          height={24}
          alt="notifications on"
          tooltipText="Turn off Notifications"
        />
      ) : (
        <TooltipIcon
          src="/icons/bell-off.svg"
          width={24}
          height={24}
          alt="notifications off"
          tooltipText="Turn on Notifications"
        />
      )}
    </button>
  );
};

export default NotificationBell;

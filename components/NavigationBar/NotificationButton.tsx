"use client";

import { useState } from "react";
import { AiOutlineBell } from "react-icons/ai";

const NotificationButton = () => {
  const [notifications, setNotifications] = useState<boolean>(false);

  return (
    <button
      className={`p-2 rounded-full flex flex-col items-center hover:text-[#8c52ff] ${
        notifications ? "text-[#8c52ff]" : "text-white"
      }`}
      aria-label="Notifications"
      onClick={() => setNotifications(!notifications)}
    >
      <AiOutlineBell
        className={`text-xl ${notifications ? "text-[#8c52ff]" : "text-white"}`}
      />
      <span className="text-xs truncate">Off</span>
    </button>
  );
};

export default NotificationButton;

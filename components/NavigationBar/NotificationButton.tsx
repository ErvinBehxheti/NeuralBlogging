"use client";

import { useState } from "react";
import { AiOutlineBell } from "react-icons/ai";

const NotificationButton = () => {
  const [notifications, setNotifications] = useState<boolean>(false);

  return (
    <button
      className="p-2 rounded-full hover:bg-gray-600"
      aria-label="Notifications"
      onClick={() => setNotifications(!notifications)}
    >
      <AiOutlineBell
        className={`text-xl ${notifications ? "text-red-400" : "text-white"}`}
      />
    </button>
  );
};

export default NotificationButton;

"use client";

import { useState } from "react";
import { AiOutlineBell, AiFillBell } from "react-icons/ai";

const NotificationButton = () => {
  const [notifications, setNotifications] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return (
    <div className="relative z-10">
      <button
        className={`p-2 rounded-full flex flex-col items-center transition-colors duration-200 ${
          notifications ? "text-[#8c52ff]" : "text-white"
        }`}
        aria-label={
          notifications ? "Disable notifications" : "Enable notifications"
        }
        onClick={() => setNotifications(!notifications)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {notifications ? (
          <AiFillBell className="text-xl" />
        ) : (
          <AiOutlineBell className="text-xl" />
        )}
        <span className="text-xs truncate">
          {hovered
            ? notifications
              ? "Off"
              : "On"
            : notifications
            ? "On"
            : "Off"}
        </span>
      </button>
      {hovered && (
        <div className="absolute top-0 mt-8 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg">
          {notifications ? "Disable" : "Enable"}
        </div>
      )}
    </div>
  );
};

export default NotificationButton;

"use client";
import React, { useState } from "react";
import Chat from "./Chat";

const Button = () => {
  const [openChat, setOpenChat] = useState(false);
  return (
    <>
      <button
        className={`${
          openChat ? "hidden" : ""
        } bg-blue-500 rounded-full p-2 fixed bottom-10 max-sm:bottom-2 max-sm:right-2 right-10 hover:scale-125 transition-all z-50`}
        onClick={() => setOpenChat(true)}
      >
        <svg
          className="w-10 h-10 text-purple-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M4 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1v2a1 1 0 0 0 1.707.707L9.414 13H15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Z"
            clip-rule="evenodd"
          />
          <path
            fill-rule="evenodd"
            d="M8.023 17.215c.033-.03.066-.062.098-.094L10.243 15H15a3 3 0 0 0 3-3V8h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1v2a1 1 0 0 1-1.707.707L14.586 18H9a1 1 0 0 1-.977-.785Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      {openChat && <Chat setOpenChat={setOpenChat} />}
    </>
  );
};

export default Button;

"use client";

import React, { useState } from "react";
import { FaCommentDots } from "react-icons/fa";
import Chat from "./Chat";

const Button = () => {
  const [openChat, setOpenChat] = useState(false);

  return (
    <>
      <button
        className={`fixed bottom-4 right-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-3 shadow-lg transition-transform transform ${
          openChat ? "opacity-0" : "opacity-100"
        } hover:scale-110 hover:shadow-xl active:scale-100 transition-all z-50`}
        onClick={() => setOpenChat(true)}
      >
        <FaCommentDots className="text-white text-2xl" />
      </button>
      {openChat && <Chat setOpenChat={setOpenChat} />}
    </>
  );
};

export default Button;

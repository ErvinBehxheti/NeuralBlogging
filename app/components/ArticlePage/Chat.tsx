"use client";
import { useChat } from "ai/react";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import TooltipIcon from "../TooltipIcon";

type Props = {
  setOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
};

const Chat = ({ setOpenChat }: Props) => {
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      api: "/api/openai",
    });

  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(300);
  const [startX, setStartX] = useState(0);
  const isTouchDevice =
    typeof window !== "undefined" && "ontouchstart" in window;

  useLayoutEffect(() => {
    const storedData = localStorage.getItem("messages");
    if (storedData) {
      const parsedMessages = JSON.parse(storedData);
      if (parsedMessages.length > 0) {
        setMessages(parsedMessages);
      }
    }
  }, [setMessages]);

  const chatContainer = useRef<HTMLDivElement>(null);
  const minChatWidth = 400;
  const maxChatWidth = typeof window !== "undefined" ? window.innerWidth : 1000;

  const startResizing = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    setIsResizing(true);
    if ("touches" in e) {
      setStartX(e.touches[0].clientX);
    } else {
      setStartX(e.clientX);
    }
    e.preventDefault();
  };

  const resize = (e: MouseEvent | TouchEvent) => {
    if (isResizing) {
      let clientX;
      if (e instanceof MouseEvent) {
        clientX = e.clientX;
      } else {
        clientX = e.touches[0].clientX;
      }
      const newWidth = width - (clientX - startX);
      setWidth(Math.max(minChatWidth, Math.min(maxChatWidth, newWidth)));
      setStartX(clientX);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (width > window.innerWidth) {
        setWidth(window.innerWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    window.addEventListener("resize", handleResize);
    if (isTouchDevice) {
      window.addEventListener("touchmove", resize);
      window.addEventListener("touchend", handleMouseUp);
    } else {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (isTouchDevice) {
        window.removeEventListener("touchmove", resize);
        window.removeEventListener("touchend", handleMouseUp);
      } else {
        window.removeEventListener("mousemove", resize);
        window.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, [width, isResizing, isTouchDevice]);

  const scroll = () => {
    const { offsetHeight, scrollHeight, scrollTop } =
      chatContainer?.current as HTMLDivElement;
    if (scrollHeight >= scrollTop + offsetHeight) {
      chatContainer.current?.scrollTo(0, scrollHeight + 200);
    }
  };

  useLayoutEffect(() => {
    scroll();
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const deleteChat = () => {
    localStorage.removeItem("messages");
    setMessages([]);
  };

  const renderResponse = () => {
    return (
      <div className="transition-all flex flex-col space-y-2">
        {messages.map((m, index) => (
          <div
            key={m.id}
            className={`flex poppins ${
              m.role === "user" ? "justify-end" : "justify-start"
            } items-start`}
          >
            {m.role === "user" ? (
              <>
                <p className="bg-blue-500 text-white p-2 rounded-lg max-w-xs break-words">
                  {m.content}
                </p>
                <Image
                  src={"/logo/logo-192.png"}
                  width={40}
                  height={40}
                  alt="profile pic"
                  className="ml-2 rounded-full object-cover"
                />
              </>
            ) : (
              <>
                <Image
                  src={
                    "http://res.cloudinary.com/diaxmj0pa/image/fetch/w_auto,f_auto/https://i.pinimg.com/736x/54/8a/d0/548ad00f6124a24184ce47cc6a19f113.jpg"
                  }
                  width={40}
                  height={40}
                  alt="profile pic"
                  className="mr-2 rounded-full object-cover"
                />
                <p className="bg-gray-300 text-black p-2 rounded-lg max-w-xs break-words">
                  {m.content}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-white/30 backdrop-blur-md border border-white/30 rounded-lg fixed right-0 bottom-0 top-0 z-20 overflow-auto flex flex-col p-4 chat-container"
      ref={chatContainer}
      style={{ width: `${width}px` }}
    >
      <div className="p-4 flex border-b-2 border-white/30 justify-between bg-black/30 text-white">
        <div className="flex justify-center items-center">
          <div className="mr-2">
            <Image
              src={
                "http://res.cloudinary.com/diaxmj0pa/image/fetch/f_auto/https://i.pinimg.com/736x/54/8a/d0/548ad00f6124a24184ce47cc6a19f113.jpg"
              }
              width={50}
              height={50}
              alt="profile pic"
              className="rounded-full object-cover"
            />
          </div>
          <div className="grid justify-center items-center pl-2">
            <h1 className="text-xl font-bold poppins">
              Professor Albus Dumbledore
            </h1>
            <h2 className="flex items-center gap-1">
              <p className="h-4 w-4 rounded-full bg-green-500"></p>Active
            </h2>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button onClick={() => deleteChat()}>
            <TooltipIcon
              src="/icons/delete.svg"
              alt="delete-chat"
              tooltipText="Delete Chat Messages"
              height={48}
              width={48}
            />
          </button>
          <button onClick={() => setOpenChat(false)}>
            <TooltipIcon
              src="/icons/leave-svgrepo-com.svg"
              alt="leave-chat"
              tooltipText="Leave Chat"
              height={65}
              width={65}
            />
          </button>
        </div>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">{renderResponse()}</div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center p-4rounded-lg poppins"
      >
        <input
          type="text"
          name="input-field"
          placeholder="Ask Dumbledore anything!"
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg bg-white/30 backdrop-blur-sm text-white placeholder-gray-200"
          value={input}
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
        >
          Send
        </button>
      </form>
      <div
        className="absolute top-0 left-0 w-2 h-full cursor-e-resize bg-gray-300 chat-resize-handle"
        onMouseDown={startResizing}
        onTouchStart={startResizing}
      ></div>
    </div>
  );
};

export default Chat;

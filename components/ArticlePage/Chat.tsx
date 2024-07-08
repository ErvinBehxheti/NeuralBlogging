"use client";
import { useChat } from "ai/react";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { format, isSameDay } from "date-fns";
import { FiLogOut, FiTrash2 } from "react-icons/fi";
import { FaPaperPlane } from "react-icons/fa";
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
  const [width, setWidth] = useState(450); // Updated default width
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
        {messages.map((m, index) => {
          const messageDate = new Date(m.createdAt as Date);
          const previousMessageDate =
            index > 0 ? new Date(messages[index - 1].createdAt as Date) : null;
          const showDateHeader =
            !previousMessageDate ||
            !isSameDay(messageDate, previousMessageDate);
          return (
            <React.Fragment key={m.id}>
              {showDateHeader && (
                <div className="text-center text-gray-500 my-2">
                  {format(messageDate, "EEEE, MMMM d, yyyy")}
                </div>
              )}
              <div
                key={m.id}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                } items-start`}
              >
                {m.role === "user" ? (
                  <>
                    <div className="flex flex-col items-end">
                      <p className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-2 rounded-lg max-w-xs break-words">
                        {m.content}
                      </p>
                      <span className="text-xs text-gray-500">
                        {format(messageDate, "p")}
                      </span>
                    </div>
                    <Image
                      src={"/logo/logo-192.png"}
                      width={40}
                      height={40}
                      alt="user profile pic"
                      className="ml-2 rounded-full object-cover"
                    />
                  </>
                ) : (
                  <>
                    <Image
                      src={
                        "http://res.cloudinary.com/diaxmj0pa/image/fetch/w_40,h_40,f_auto/https://i.pinimg.com/736x/54/8a/d0/548ad00f6124a24184ce47cc6a19f113.jpg"
                      }
                      width={40}
                      height={40}
                      alt="albus dumbledore"
                      className="mr-2 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <p className="bg-gray-200 text-black p-2 rounded-lg max-w-xs break-words">
                        {m.content}
                      </p>
                      <span className="text-xs text-gray-500">
                        {format(messageDate, "p")}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 glassmorphism border border-gray-300 rounded-lg fixed right-0 bottom-0 top-0 z-20 overflow-auto flex flex-col p-4 chat-container poppins"
      ref={chatContainer}
      style={{ width: `${width}px` }}
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "100vw" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5,
      }}
    >
      <div className="p-4 flex justify-between">
        <div className="flex justify-center items-center">
          <div className="mr-2">
            <Image
              src={
                "http://res.cloudinary.com/diaxmj0pa/image/fetch/f_auto,w_50,h_50/https://i.pinimg.com/736x/54/8a/d0/548ad00f6124a24184ce47cc6a19f113.jpg"
              }
              width={50}
              height={50}
              alt="albus dumbledore"
              className="rounded-full object-cover"
            />
          </div>
          <div className="grid justify-center items-center pl-2">
            <h1 className="text-xl font-bold text-black">
              Professor Albus Dumbledore
            </h1>
            <h2 className="flex items-center gap-1">
              <p className="h-4 w-4 rounded-full bg-green-500"></p>Active
            </h2>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={() => deleteChat()}
            className="mr-2 p-2 text-gray-500 hover:text-black"
          >
            <TooltipIcon
              icon={<FiTrash2 size={20} />}
              alt="delete-chat"
              tooltipText="Delete Chat"
            />
          </button>
          <button
            onClick={() => setOpenChat(false)}
            className="p-2 text-gray-500 hover:text-black"
          >
            <TooltipIcon
              icon={<FiLogOut size={20} />}
              alt="leave-chat"
              tooltipText="Leave Chat"
            />
          </button>
        </div>
      </div>
      <div className="flex-grow p-4 overflow-y-auto border-t-2 border-black/80">
        {renderResponse()}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center p-4 rounded-lg"
      >
        <input
          type="text"
          name="input-field"
          placeholder="Ask Dumbledore anything!"
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg bg-white/30 text-black placeholder-gray-500"
          value={input}
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
        >
          <FaPaperPlane size={20} />
        </button>
      </form>
      <div
        className="absolute top-0 left-0 w-2 h-full cursor-e-resize bg-gray-300 chat-resize-handle"
        onMouseDown={startResizing}
        onTouchStart={startResizing}
      ></div>
    </motion.div>
  );
};

export default Chat;

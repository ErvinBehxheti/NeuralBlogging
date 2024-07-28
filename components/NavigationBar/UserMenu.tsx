"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AiOutlineRocket,
  AiOutlineUser,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineCloudDownload,
  AiOutlineLogin,
} from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import NotificationButton from "./NotificationButton";

const UserMenu = ({ user, pathname }: any) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  const isSigned = user ? true : false;

  return (
    <>
      <nav className="fixed bottom-0 h-16 left-0 w-full poppins glassmorphism bg-[#0e1217]/70 border-t border-[#8c52ff] shadow-[#8c52ff] flex items-center justify-between p-3 md:hidden z-10">
        <Link
          href="/"
          aria-label="Home"
          className={`flex flex-col items-center hover:text-[#8c52ff] ${
            pathname === "/" ? "text-[#8c52ff]" : "text-white"
          }`}
        >
          <AiOutlineHome className="text-2xl" />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          href="/writearticle"
          aria-label="Create AI Blog"
          className={`flex flex-col items-center hover:text-[#8c52ff] ${
            pathname === "/writearticle" ? "text-[#8c52ff]" : "text-white"
          }`}
        >
          <AiOutlineRocket className="text-2xl" />
          <span className="text-xs">Create</span>
        </Link>
        <Link
          href="/writearticle"
          aria-label="Create AI Blog"
          className="flex flex-col items-center text-white hover:text-[#8c52ff]"
        >
          <AiOutlineCloudDownload className="text-2xl" />
          <span className="text-xs">Install</span>
        </Link>
        <NotificationButton />
        {isSigned ? (
          <button
            onClick={toggleSidebar}
            className="flex flex-col items-center"
          >
            {user?.profilePicture ? (
              <Image
                src={user.profilePicture}
                alt="Profile Picture"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-500 text-white text-xl">
                {getInitial(user?.name)}
              </div>
            )}
          </button>
        ) : (
          <Link
            href="/signup"
            aria-label="Sign In"
            className="flex flex-col items-center hover:text-[#8c52ff] text-white"
          >
            <AiOutlineLogin className="text-2xl" />
            <span className="text-xs">Sign In</span>
          </Link>
        )}
      </nav>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-50 flex"
          >
            <div className="bg-[#0e1217] min-h-screen w-full p-4 border border-[#8c52ff] shadow-lg text-white flex flex-col justify-between">
              <button
                onClick={toggleSidebar}
                className="absolute top-4 right-4"
                aria-label="Close Sidebar"
              >
                <AiOutlineClose className="text-2xl" />
              </button>
              <ul className="py-2 flex-grow">
                <li>
                  <Link
                    href="/profile/blogs"
                    className="flex items-center px-4 py-2 hover:bg-[#8c52ff] hover:text-white transition-colors"
                    onClick={toggleSidebar}
                  >
                    <AiOutlineRocket className="mr-2" />
                    My Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile/settings"
                    className="flex items-center px-4 py-2 hover:bg-[#8c52ff] hover:text-white transition-colors"
                    onClick={toggleSidebar}
                  >
                    <AiOutlineUser className="mr-2" />
                    Settings
                  </Link>
                </li>
                <li>
                  <button onClick={() => alert("Sign out")}>
                    <a className="flex items-center px-4 py-2 hover:bg-[#8c52ff] hover:text-white transition-colors">
                      <AiOutlineClose className="mr-2" />
                      Sign Out
                    </a>
                  </button>
                </li>
              </ul>
            </div>
            <div className="flex-grow" onClick={toggleSidebar}></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserMenu;

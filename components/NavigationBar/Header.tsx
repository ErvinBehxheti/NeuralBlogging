"use client";

import Image from "next/image";
import {
  AiOutlineCloudDownload,
  AiOutlineRocket,
  AiOutlineBell,
  AiOutlineLogin,
  AiOutlineHome,
  AiOutlineLogout,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const [showToast, setShowToast] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setNotifications(true); // Example notification logic
  }, []);

  const handleCreateBlogClick = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleInstallClick = () => {
    // Logic for handling PWA installation
  };

  console.log('headerSession', {session})

  return (
    <>
      <header>
        <nav className="glassmorphism p-6 h-20 w-full bg-[#0e1217]/30 max-md:hidden rounded-b-sm border-b flex justify-between items-center fixed border-[#8c52ff] shadow-[#8c52ff] z-10 md:py-4 md:px-6 poppins">
          <Link className="flex items-center" href="/">
            <Image
              src="/logo/logonobg.png"
              alt="logo"
              width={60}
              height={60}
              className="object-cover"
            />
            <h1 className="text-white font-bold text-xl poppins hidden md:block">
              Neural Blogging
            </h1>
          </Link>
          <div className="flex items-center space-x-2 md:space-x-2">
            <Link
              href="/writearticle"
              className={`flex items-center px-3 py-1.5 text-sm bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 focus:outline-none rounded-lg shadow-lg transform transition-transform hover:scale-105 text-white ${
                pathname === "/writearticle" ? "bg-purple-700" : ""
              }`}
              onClick={handleCreateBlogClick}
            >
              <AiOutlineRocket className="mr-1" />
              Create AI Blog
            </Link>
            <button
              className={`flex items-center px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-lg shadow-lg transform transition-transform hover:scale-105 text-white ${
                pathname === "/" ? "bg-blue-700" : ""
              }`}
              onClick={handleInstallClick}
            >
              <AiOutlineCloudDownload className="mr-1" />
              Install PWA
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-600"
              aria-label="Notifications"
              onClick={() => setNotifications(!notifications)}
            >
              <AiOutlineBell
                className={`text-xl ${
                  notifications ? "text-red-400" : "text-white"
                }`}
              />
            </button>
            {session ? (
              <button
                className="flex items-center px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 focus:ring-2 text-white focus:ring-green-400 focus:outline-none rounded-lg shadow-lg transform transition-transform hover:scale-105"
                onClick={() => signOut()}
              >
                {" "}
                <AiOutlineLogout className="mr-1" />
                Sign Out
              </button>
            ) : (
              <button
                className="flex items-center px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white focus:ring-2 focus:ring-green-400 focus:outline-none rounded-lg shadow-lg transform transition-transform hover:scale-105"
                onClick={() => signIn()}
              >
                {" "}
                <AiOutlineLogin className="mr-1" />
                Sign In
              </button>
            )}
          </div>
          {showToast && pathname !== "/writearticle" && (
            <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-2 px-4 flex items-center space-x-2 z-30">
              <ClipLoader color="#ffffff" size={20} />
              <span>Getting your creative engine started!</span>
            </div>
          )}
        </nav>
      </header>

      <nav className="fixed bottom-0 left-0 w-full glassmorphism bg-[#0e1217]/70 border-t border-[#8c52ff] shadow-[#8c52ff] flex items-center justify-between p-3 md:hidden z-10">
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
          onClick={handleCreateBlogClick}
        >
          <AiOutlineRocket className="text-2xl" />
          <span className="text-xs">Create</span>
        </Link>
        <button
          aria-label="Install PWA"
          className="flex flex-col items-center text-white hover:text-[#8c52ff]"
          onClick={handleInstallClick}
        >
          <AiOutlineCloudDownload className="text-2xl" />
          <span className="text-xs">Install</span>
        </button>
        <button
          aria-label="Notifications"
          className="flex flex-col items-center text-white hover:text-red-400"
          onClick={() => setNotifications(!notifications)}
        >
          <AiOutlineBell
            className={`text-2xl ${
              notifications ? "text-red-400" : "text-white"
            }`}
          />
          <span className="text-xs">Notifications</span>
        </button>
      </nav>
    </>
  );
};

export default Header;

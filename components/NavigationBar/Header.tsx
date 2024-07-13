"use server";

import Link from "next/link";
import Image from "next/image";
import {
  AiOutlineRocket,
  AiOutlineLogin,
  AiOutlineHome,
  AiOutlineLogout,
} from "react-icons/ai";
import InstallButton from "./InstallButton";
import NotificationButton from "./NotificationButton";
import CreateAiBlog from "./CreateAiBlog";
import { headers } from "next/headers";

const Header = () => {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  const isSigned = false;

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
            <CreateAiBlog />
            <InstallButton />
            <NotificationButton />
            {isSigned ? (
              <button className="flex items-center px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 focus:ring-2 text-white focus:ring-green-400 focus:outline-none rounded-lg shadow-lg transform transition-transform hover:scale-105">
                <AiOutlineLogout className="mr-1" />
                Sign Out
              </button>
            ) : (
              <Link
                className="flex items-center px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white focus:ring-2 focus:ring-green-400 focus:outline-none rounded-lg shadow-lg transform transition-transform hover:scale-105"
                href={"/signup"}
              >
                <AiOutlineLogin className="mr-1" />
                Sign In
              </Link>
            )}
          </div>
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
        >
          <AiOutlineRocket className="text-2xl" />
          <span className="text-xs">Create</span>
        </Link>
        <InstallButton />
        <NotificationButton />
      </nav>
    </>
  );
};

export default Header;

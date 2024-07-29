"use server";

import Link from "next/link";
import Image from "next/image";
import { AiOutlineLogin } from "react-icons/ai";
import InstallButton from "./InstallButton";
import NotificationButton from "./NotificationButton";
import CreateAiBlog from "./CreateAiBlog";
import { headers } from "next/headers";
import { verifyToken } from "@/serveractions/verifyToken";
import UserMenu from "./UserMenu";

const Header = async () => {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  const user = await verifyToken();
  const isSigned = user ? true : false;

  return (
    <>
      <header className="glassmorphism p-6 h-20 w-full bg-[#0e1217]/30 max-md:hidden rounded-b-sm border-b flex justify-between items-center fixed border-[#8c52ff] shadow-[#8c52ff] z-10 md:py-4 md:px-6 poppins">
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
          <NotificationButton />
          <CreateAiBlog />
          <InstallButton />
          {isSigned ? (
            <UserMenu user={user} />
          ) : (
            <Link
              className="flex items-center px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white focus:ring-2 focus:ring-green-400 focus:outline-none rounded-lg shadow-lg transform transition-transform hover:scale-105"
              href={"/login"}
            >
              <AiOutlineLogin className="mr-1" />
              Log In
            </Link>
          )}
        </div>
      </header>

      {/* Bottom Navbar for small devices */}
      <div className="hidden max-md:block">
        <UserMenu user={user} pathname={pathname} />
      </div>
    </>
  );
};

export default Header;

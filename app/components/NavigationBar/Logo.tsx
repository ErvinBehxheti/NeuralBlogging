"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Logo = () => {
  const pathname = usePathname();
  return (
    <Link
      className={`${
        pathname === "/writearticle" ? "" : "max-[325px]:hidden"
      } flex items-center justify-center text-xl font-semibold`}
      href="/"
      aria-label="Brand"
    >
      <Image
        src="/logo/logonobg.png"
        alt="logo"
        width={100}
        height={100}
        objectFit="cover"
      />
      <h1 className="text-white font-bold text-2xl newsreader max-md:hidden">
        Neural Blogging
      </h1>
    </Link>
  );
};

export default Logo;

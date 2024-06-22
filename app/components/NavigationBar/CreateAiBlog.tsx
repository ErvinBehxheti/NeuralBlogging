"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import "loaders.css/src/animations/semi-circle-spin.scss";
import Loader from "react-loaders";

const CreateAiBlog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      setIsLoading(false);
    }
  }, [pathname]);

  return (
    <>
      {" "}
      <Link
        href="/writearticle"
        className={`${
          pathname === "/writearticle" ? "hidden" : ""
        } text-white border p-3 rounded-2xl border-white hover:border-[#6A0DAD] text-lg hover:text-[#6A0DAD] newsreader`}
        onClick={() => setIsLoading(true)}
      >
        Create Your AI Blog
      </Link>
      {isLoading && pathname === "/" && (
        <div id="snackbar" className="show">
          <Loader type="semi-circle-spin" active />
          Getting your creative engine started!
        </div>
      )}
    </>
  );
};

export default CreateAiBlog;

"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";

const InstallButton = () => {
  const [isStandalone, setIsStandalone] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsStandalone(true);
    }
  }, []);

  const handleInstallClick = () => {
    // Logic for handling PWA installation
  };

  if (isStandalone) return null;

  return (
    <button
      className={`flex items-center px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-lg shadow-lg transform transition-transform hover:scale-105 text-white ${
        pathname === "/" ? "bg-blue-700" : ""
      }`}
      onClick={handleInstallClick}
    >
      <AiOutlineCloudDownload className="mr-1" />
      Install PWA
    </button>
  );
};

export default InstallButton;

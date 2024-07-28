"use client";

import { AiOutlineLogout } from "react-icons/ai";

const SignOutButton = () => {
  const handleSignOut = async () => {
    const response = await fetch("/api/signout", {
      method: "POST",
    });

    if (response.ok) {
      window.location.reload();
    } else {
      console.error("Failed to sign out");
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 focus:ring-2 text-white focus:ring-green-400 focus:outline-none rounded-lg shadow-lg transform transition-transform hover:scale-105"
    >
      <AiOutlineLogout className="mr-1" />
      Sign Out
    </button>
  );
};

export default SignOutButton;

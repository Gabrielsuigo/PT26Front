"use client";

import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/navigation";

const UserWidget = () => {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  return (
    <div className="flex items-center gap-4">
      {!user?.login ? (
        <>
          <Link
            href="/login"
            className="text-sm font-semibold text-black dark:text-white hover:text-neutral-800 dark:hover:text-neutral-300 transition duration-300"
          >
            👤 Sign In
          </Link>
          <button
            onClick={handleRegisterRedirect}
            className="text-sm font-semibold text-black dark:text-white border border-black dark:border-white hover:bg-neutral-100 dark:hover:bg-neutral-800 py-1 px-3 rounded-lg transition duration-300"
          >
            Register
          </button>
        </>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-sm font-semibold text-black dark:text-white hover:text-primary dark:hover:text-primary transition duration-300"
          >
            👤 {user.user.name}
          </Link>
         <button
            onClick={logout}
            className="text-sm font-semibold text-black dark:text-white border border-black dark:border-white hover:bg-neutral-100 dark:hover:bg-neutral-800 py-1 px-3 rounded-lg transition duration-300"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserWidget;
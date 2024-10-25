"use client";

import UserPlus from "../components/UserPlus";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

function Header() {
  const { data, status } = useSession();
  return (
    <>
      <header className="flex justify-between my-8">
        <Link className="flex gap-1 items-center" href="/">
          <span>Captify</span>
        </Link>
        <nav className="flex gap-10 text-white/80 items-center">
          <Link href="/">Home</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About</Link>
          {status === "authenticated" ? (
            <>
              <button
                className="inline-flex gap-2 border-2 border-purple-700/10 cursor-pointer"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              className="inline-flex gap-2 border cursor-pointer border-white px-4 py-2"
              onClick={() => signIn("google")}
            >
              Sign in
            </button>
          )}
          {data && (
            <img
              src={data.user.image}
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
          )}
        </nav>
      </header>
    </>
  );
}

export default Header;

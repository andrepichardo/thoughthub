"use client";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import Link from "next/link";

type User = {
  image: string;
  name: string | null | undefined;
};

const Logged = ({ image, name }: User) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="flex gap-5 items-center">
      <button
        className="text-sm bg-white border-2 border-red-400 text-red-400 hover:bg-gray-100 px-4 py-2 rounded-lg font-bold"
        onClick={async () => {
          setIsLoading(true);
          try {
            await signOut();
          } catch (error) {
            console.error("Sign-out error:", error);
          }
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <CgSpinner className="w-5 h-5 animate-spin" />
        ) : (
          "Sign out"
        )}
      </button>
      <Link
        href="/dashboard"
        className="text-red-500 font-bold flex items-center gap-2"
      >
        <span className="hidden md:block">{name}</span>
        <Image
          className="rounded-full"
          width={45}
          height={45}
          src={image}
          alt="profile picture"
          priority
        />
      </Link>
    </div>
  );
};

export default Logged;

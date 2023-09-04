"use client";
import Image from "next/image";
import { signOut } from "next-auth/react";

type Props = {
  image: string;
  name: string | null | undefined;
};

const Logged = ({ image, name }: Props) => {
  return (
    <div className="flex gap-5 items-center">
      <span className="text-red-500 font-bold flex items-center gap-2">
        <Image
          className="rounded-full"
          width={45}
          height={45}
          src={image}
          alt="profile picture"
        />
        {name}
      </span>
      <button
        className="text-sm bg-white border-2 border-red-400 text-red-400 hover:bg-gray-100 px-4 py-2 rounded-lg font-bold"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </div>
  );
};

export default Logged;

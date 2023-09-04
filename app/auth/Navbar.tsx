import Link from "next/link";
import React from "react";
import Login from "./Login";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Image from "next/image";
import Logo from "@/public/logo.png";
import Logged from "./Logged";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <nav className=" flex justify-between items-center gap-2 min-h-[45px] h-full">
      <Link href="/">
        <h1 className="text-lg font-bold flex items-center gap-1 text-red-500">
          <Image src={Logo} width={30} height={30} alt="" /> PostItApp
        </h1>
      </Link>
      <ul>
        {!session?.user && <Login />}
        {session?.user && (
          <Logged
            name={session.user.name}
            image={session.user.image as string}
          />
        )}
      </ul>
    </nav>
  );
}

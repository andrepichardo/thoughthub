import Link from "next/link";
import React from "react";
import Login from "./Login";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Image from "next/image";
import Logo from "@/public/logo.png";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <nav className=" flex justify-between gap-2">
      <Link href="/">
        <h1 className="text-lg font-bold flex items-center gap-1 text-red-500">
          <Image src={Logo} width={30} height={30} alt="" /> PostItApp
        </h1>
      </Link>
      <ul>
        <Login />
      </ul>
    </nav>
  );
}

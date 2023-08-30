import Link from 'next/link';
import React from 'react';
import Login from './Login';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <nav className="containerLayout flex justify-between gap-2">
      <Link href="/">
        <h1 className="text-lg font-bold">PostItApp</h1>
      </Link>
      <ul>
        <Login />
      </ul>
    </nav>
  );
}

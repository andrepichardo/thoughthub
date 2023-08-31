"use client";

import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <li className="list-none">
      <button
        className="text-sm bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg font-bold"
        onClick={() => signIn()}
      >
        Sign In
      </button>
    </li>
  );
};

export default Login;

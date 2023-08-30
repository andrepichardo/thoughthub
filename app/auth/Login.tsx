'use client';

import { signIn } from 'next-auth/react';

const Login = () => {
  return (
    <li className="list-none">
      <button className="text-sm" onClick={() => signIn()}>
        Sign In
      </button>
    </li>
  );
};

export default Login;

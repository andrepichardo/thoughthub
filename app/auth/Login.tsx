'use client';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { signIn, getProviders } from 'next-auth/react';

const Login = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <li className="list-none">
      <button
        className="text-sm bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg font-bold"
        onClick={() => signIn()}
      >
        Sign In
      </button>

      {/* {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))} */}
    </li>
  );
};
export default Login;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers },
  };
}

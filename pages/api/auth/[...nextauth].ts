import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '../../../prisma/client';
import type { Adapter } from 'next-auth/adapters';

export const authOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),   
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      
    }),
  ],
};
export default NextAuth(authOptions);

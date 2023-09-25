import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'My Profile',
};

type Props = {};

export default async function MyProfile({}: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('api/auth/signin');
  }
  return (
    <main className="w-full h-full flex flex-col flex-grow">
      <h1 className="text-2xl font-bold text-red-500">
        Welcome back, {session?.user?.name}
      </h1>
    </main>
  );
}

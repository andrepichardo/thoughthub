import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Profile',
};

type Props = {};

export default async function MyProfile({}: Props) {
  return (
    <main className="w-full h-full flex flex-col flex-grow">
      <h1 className="text-2xl">My Profile</h1>
    </main>
  );
}

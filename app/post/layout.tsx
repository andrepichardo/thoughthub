import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Post details',
};

export default function DetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

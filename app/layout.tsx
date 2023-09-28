import { Toaster } from 'react-hot-toast';
import Navbar from './auth/Navbar';
import QueryWrapper from './auth/QueryWrapper';
import './globals.css';
import { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: {
    template: '%s | ThoughtHub ',
    default: 'Home | ThoughtHub',
  },
  description: 'A thoughts sharing app.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader color="#ef4444" speed={100} crawlSpeed={100} />
        <div className="bgImage w-full fixed z-[1] h-[3px]"></div>
        <div className="flex flex-col gap-4 bg-white containerLayout rounded-lg min-h-screen shadow-lg">
          <QueryWrapper>
            <Navbar />
            <Toaster />
            {children}
          </QueryWrapper>
        </div>
      </body>
    </html>
  );
}

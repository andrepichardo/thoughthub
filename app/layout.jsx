import { Toaster } from 'react-hot-toast';
import Navbar from './auth/Navbar';
import QueryWrapper from './auth/QueryWrapper';
import './globals.css';

export const metadata = {
  title: {
    default: 'PostItApp',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="py-3.5 px-3">
        <div className="flex flex-col gap-7 bg-white containerLayout rounded-lg min-h-[96vh] overflow-auto py-4 shadow-lg">
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

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404',
};

const NotFound = () => {
  return (
    <>
      <div className="text-5xl text-red-500 font-bold flex flex-col justify-center items-center flex-grow gap-3">
        <h4 className="text-9xl">404</h4>
        <span>Page Not Found</span>
        <Link
          href="/"
          className="bg-red-500 hover:bg-red-400 rounded-full px-6 py-2 text-base text-white mt-4"
        >
          Back to Home
        </Link>
      </div>
    </>
  );
};
export default NotFound;

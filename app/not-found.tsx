import Link from 'next/link';

const NotFound = () => {
  return (
    <>
      <div className="text-red-500 font-bold flex flex-col justify-center items-center flex-grow -mt-24 gap-3 text-center">
        <h4 className="text-7xl sm:text-9xl">404</h4>
        <span className="text-3xl sm:text-5xl">Page Not Found</span>
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

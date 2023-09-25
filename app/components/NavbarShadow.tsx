'use client';
import { useEffect, useState } from 'react';

const NavbarShadow = ({ children }: any) => {
  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= window.innerHeight * 0.02) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener('scroll', handleShadow);
  }, []);

  return (
    <>
      <header
        className={
          shadow
            ? 'fixed max-w-4xl w-full rounded-t-lg py-3.5 z-40 bg-white shadow-md'
            : 'fixed max-w-4xl w-full rounded-t-lg py-3.5 z-40 bg-white'
        }
      >
        {children}
      </header>
      <div className="h-[73px]" />
    </>
  );
};

export default NavbarShadow;

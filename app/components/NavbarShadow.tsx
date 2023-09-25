'use client';
import { useEffect, useState } from 'react';

const NavbarShadow = () => {
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
      <div
        className={
          shadow
            ? 'fixed max-w-4xl w-full h-[73px] shadow-md z-10'
            : 'fixed max-w-4xl w-full h-[73px] z-10'
        }
      />
      <div className="h-[73px] mb-5" />
    </>
  );
};

export default NavbarShadow;

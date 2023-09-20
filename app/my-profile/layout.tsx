'use client';
import NavbarShadow from '../components/NavbarShadow';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col flex-grow w-full h-full">
      <NavbarShadow />
      <div className="px-2 xs:px-3 md:px-4 2xl:px-6">{children}</div>
    </section>
  );
}

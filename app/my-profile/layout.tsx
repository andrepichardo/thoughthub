'use client';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col flex-grow w-full h-full">
      {children}
    </section>
  );
}

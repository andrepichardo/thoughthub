"use client";

import AddPost from "./components/AddPost";

export default function Home() {
  return (
    <main
      id="scrollbar"
      className="w-full h-full flex flex-col max-h-[85vh] overflow-auto"
    >
      <AddPost />
    </main>
  );
}

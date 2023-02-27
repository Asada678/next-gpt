"use client";

import Link from "next/link";

export default function Navigation() {
  return (
    <header className="bg-gray-200 border-b border-gray-200 py-5 sticky top-0 z-10">
      <div className="container max-w-scree-xl mx-auto relative flex justify-center items-center">
        <Link
          href="/"
          className="font-bold text-xl cursor-pointer"
        >
          Chat App with GPT
        </Link>
      </div>
    </header>
  );
}

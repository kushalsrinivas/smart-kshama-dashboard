import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between p-4">
      <Link href="/" className="text-2xl font-bold">
        Smart Donna
      </Link>
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/private-library">Private Library</Link>
      </div>
    </div>
  );
};

export default Header;

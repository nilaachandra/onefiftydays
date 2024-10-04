import { Link } from "next-view-transitions";
import React from "react";
import { LuInstagram, LuTwitter } from "react-icons/lu";
const Navbar = () => {
  return (
    <nav className="w-full py-4 flex justify-between items-center">
      <Link
        href={"/"}
        className="font-bold hover:text-zinc-600 duration-200 transition-all text-lg cursor-pointer"
      >
        One Fifty Days
      </Link>
      <div className="flex items-center gap-2">
        <Link
          href={"/about"}
          className="font-bold hover:underline duration-200 transition-all text-lg"
        >
          About
        </Link>
        <a
          href="https://x.com/nilaacodes"
          target="_blank"
          className="hover:text-zinc-600 duration-200 transition-all"
        >
          <LuTwitter size={20} />
        </a>
        <a
          href="https://www.instagram.com/niillaaa.a/"
          target="_blank"
          className="hover:text-zinc-600 duration-200 transition-all"
        >
          <LuInstagram size={20} />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

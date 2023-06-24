import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../assets/videre-logo.png";
import { IoMdAdd } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center border b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[50px] md:w-[65px]">
          <Image className="cursor-pointer" src={Logo} alt="Videre" />
        </div>
      </Link>
      <Link href="/upload">
        <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
          <IoMdAdd className="text-xl" />{" "}
          <span className="hidden md:block">Upload</span>
        </button>
      </Link>
    </div>
  );
};

export default Navbar;

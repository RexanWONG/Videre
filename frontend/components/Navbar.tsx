import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../assets/videre-logo.png";
import { IoMdAdd } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[50px] md:w-[65px]">
          <Image className="cursor-pointer" src={Logo} alt="Videre" />
        </div>
      </Link>

      <div className="flex items-center space-x-2">
        <button className=" border-2 px-2 md:px-6 py-2 md:py-3 bg-blue-400 text-white text-md font-semibold flex items-center gap-2 rounded-full hover:scale-110 hover:bg-blue-500 hover:text-white transition-all duration-200">
          <span><h1 className="font-raleway">Connect Wallet</h1></span>
        </button>
      </div>
      {/* <Link href="/upload">
        <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
          <IoMdAdd className="text-xl" />{" "}
          <span className="hidden md:block">Upload</span>
        </button>
      </Link> */}
    </div>
  );
};

export default Navbar;

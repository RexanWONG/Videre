import React from "react";
import { BiSolidLock } from "react-icons/bi";
import Image from "next/image";
import RegisterImage from "../assets/register.jpg";

const NoRegister = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="mb-8">
        <Image src={RegisterImage} alt="Register" width={250} height={250} />
      </div>
      <div className="w-100 h-16 bg-gray-200 rounded-lg flex items-center justify-center px-4">
        <p className="text-white text-lg font-bold font-raleway text-gray-600">
          You are not registered. Please register to continue.
        </p>
      </div>
    </div>
  );
};

export default NoRegister;
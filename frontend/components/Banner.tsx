import React from "react";
import { NextPage } from "next";
import BannerBg from "../assets/banner-bg.jpg";

const Banner: NextPage = () => {
  return (
    <div
      className="rounded-lg bg-[url('../assets/banner-bg.jpg')] bg-cover bg-center overflow-hidden bg-black"
      style={{ height: "200px" }}
    >
      <div className="p-4 pl-8 pr-8">
        <h1 className="text-white text-3xl font-black font-montserrat">BUILDING THE FUTURE</h1>
        <p className="text-white font-medium font-raleway">Slogan Slogan</p>
      </div>
    </div>
  );
};

export default Banner;
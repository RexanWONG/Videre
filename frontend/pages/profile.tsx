import React, { useState, useEffect } from "react";
import { GoVerified } from "react-icons/go";
import type { NextPage } from "next";
import { Banner, Card, Content } from "../components";
import Head from "next/head";
import Image from "next/image";
import pfp from "../assets/pfp.png";

const Profile = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleTooltipEnter = () => {
    setShowTooltip(true);
  };

  const handleTooltipLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="flex flex-col">
      <h1 className="font-bold font-montserrat text-3xl text-left pl-0">
        My Profile
      </h1>
      <h1 className="font-bold font-montserrat text-l text-left pl-0 text-gray-500">
        Welcome back{" "}
      </h1>{" "}
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2">
          <div className="flex items-center space-x-4">
            <Image
              className="w-24 h-24 rounded-full"
              src={pfp}
              alt="profile-picture"
            />
            <div className="flex flex-col py-20">
              <div className="flex items-center">
                <h1 className="text-xl font-bold font-montserrat mr-2">
                  John Doe
                </h1>
                <div
                  className="relative"
                  onMouseEnter={handleTooltipEnter}
                  onMouseLeave={handleTooltipLeave}
                >
                  <GoVerified className="text-blue-500" />
                  {showTooltip && (
                    <div className="absolute left-1/2 bottom-full transform -translate-x-1/2 mt-2 bg-green-100 px-4 py-2 text-sm rounded text-center">
                      <p className="text-green-500">Worldcoin Verified</p>
                    </div>
                  )}
                </div>
                
              </div>
              <p className="text-gray-500 font-bold font-raleway">
                Content Creator
              </p>
              
            </div>
            
          </div>
          <h1 className="text-xl font-bold font-montserrat">Total Likes ♥</h1>
                <h1 className="text-xl font-bold font-montserrat">9473</h1>
        </div>
        <div className="w-full md:w-1/2">
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Profile;

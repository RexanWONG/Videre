import React, { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { GoVerified } from 'react-icons/go';

import Image from 'next/image';
import pfp from '../assets/pfp.png';

const Profile: React.FC = () => {
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
    <>
      <div className="relative">
        <div className="">
          <div className="text-2xl flex items-center gap-3 justify-center" onClick={handlePopup}>
            <AiOutlineUser />
            <span className="capitalize font-montserrat text-xl hidden xl:block">Profile</span>
          </div>
        </div>
        {showPopup && (
          <>
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20">
              <div className="bg-white border border-gray-300 rounded p-4 max-w-md mx-4 relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={handlePopup}
                >
                  <ImCancelCircle size={18} />
                </button>
                <div className="flex items-center space-x-4">
                  <Image className="w-24 h-24 rounded-full" src={pfp} alt="profile-picture" />
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <h1 className="text-xl font-bold font-montserrat mr-2">John Doe</h1>
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
                    <p className="text-gray-500 font-bold font-raleway">Content Creator</p>
                  </div>
                </div>
                <br />
                <h1 className="text-xl font-bold font-montserrat">Total Likes ♥</h1>
                <h1 className="text-xl font-bold font-montserrat">9473</h1>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
import React, { useState, useEffect } from "react";
import { GoVerified } from "react-icons/go";
import type { NextPage } from "next";
import { Banner, Card, Content } from "../components";
import Head from "next/head";
import Image from "next/image";
import pfp from "../assets/pfp.png";
import { MetaMaskSDK } from '@metamask/sdk';
import { ethers } from 'ethers'
import abi from '../components/data/Videre.json'

const Profile = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false)

  const options = {
    dappMetadata: { name: "My Dapp", url: "https://mydapp.com" },
    injectProvider: true
  };
  const MMSDK = new MetaMaskSDK(options);
  const ethereum = MMSDK.getProvider();

  const contractAddress = "0x0784405c4438fc61f013fD00Eaabb1962c5952e9";
  const contractABI = abi.abi;
  const [videreContract, setVidereContract] = useState(null);

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleTooltipEnter = () => {
    setShowTooltip(true);
  };

  const handleTooltipLeave = () => {
    setShowTooltip(false);
  };

  useEffect(() => {
    const checkMetaMask = async () => {
      if (ethereum && ethereum.isConnected()) {
        // Request the current accounts from MetaMask
        const accounts = await ethereum.request({ method: 'eth_accounts' });

        // Update the current account state variable
        setCurrentAccount(accounts[0]);
      }
    };

    checkMetaMask();
    const initEthereum = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const videreContract = new ethers.Contract(contractAddress, contractABI, signer);
      setVidereContract(videreContract);
    };
    

    const checkIfUserIsVerified = async () => {
      try {
        if (videreContract) {
          const userInfo = await videreContract.getContentCreatorInfo(currentAccount);
          if (userInfo[6] == true) {
            setIsRegistered(true)
          } else {
            setIsRegistered(false)
          }
          console.log(userInfo)
        }
      } catch (error) {
        alert(error)
      }
    }

    initEthereum();
    checkIfUserIsVerified();
    
  }, []);

  return (
    <div className="flex flex-col">
      {isRegistered ? (
        <div>
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
      ) : (
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold">You need to register an account</h1>
        </div>
      )}
    </div>
  );
};

export default Profile;

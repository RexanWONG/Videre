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
import truncateEthAddress from "truncate-eth-address";

const Profile = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false)
  const [viewProfileClicked, setViewProfileClicked] = useState(false)

  const [username, setUsername] = useState('')
  const [totalLikes, setTotalLikes] = useState(0)
  const [isAdvitiser, setIsAdvitiser] = useState(false)

  const options = {
    dappMetadata: { name: "My Dapp", url: "https://mydapp.com" },
    injectProvider: true
  };

  const MMSDK = new MetaMaskSDK(options);
  const ethereum = MMSDK.getProvider();

  const contractAddress = "0xAd4f805527BC493E9ba3721ECa01d635d43B4c32";
  const contractABI = abi.abi;
  const [videreContract, setVidereContract] = useState(null);

  const [inputValue, setInputValue] = useState({
    username: "",
    isAdvitiser: true,
  });


  const handleInputChange = (event) => {
    setInputValue((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleRoleChange = (role) => {
    setInputValue(prevState => ({
      ...prevState,
      isAdvitiser: role === "Adviser"
    }));
  };

  const registerAccount = async () => {
    try {
      const register = await videreContract.registerAccount(
        inputValue.username,
        inputValue.isAdvitiser
      )

      await register.wait()
      alert("Account registered!")
    } catch (error) {
      alert(error)
    }
  }


  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleTooltipEnter = () => {
    setShowTooltip(true);
  };

  const handleTooltipLeave = () => {
    setShowTooltip(false);
  };

  const checkIfUserIsVerified = async () => {
    try {
      if (videreContract) {
        setViewProfileClicked(true)
        const userInfo = await videreContract.getContentCreatorInfo(currentAccount);
        console.log("User Info :", userInfo)
        if (userInfo[5] == true) {
          setIsRegistered(true)
        } else {
          setIsRegistered(false)
        }

        setUsername(userInfo[1])
        setTotalLikes(userInfo[2])
        setIsAdvitiser(userInfo[4])
       
      }
    } catch (error) {
      alert(error)
    }
  }

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
    

    initEthereum();
    
  }, []);

  return (
    <div className="flex flex-col">
      <button onClick={checkIfUserIsVerified}>
        View Profile
      </button>
      
      {viewProfileClicked ? (
        isRegistered ? (
          <div>
            <h1 className="font-bold font-montserrat text-3xl text-left pl-0">
              My Profile
            </h1>
            <h1 className="font-bold font-montserrat text-l text-left pl-0 text-gray-500">
              Welcome back, {username}
            </h1>
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
                        {username}
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
                      {isAdvitiser ? (
                        <span>Advitiser</span>
                      ) : (
                        <span>Content Creator</span>
                      )}
                    </p>
                    
                  </div>
                  
                </div>
                <h1 className="text-xl font-bold font-montserrat">Total Likes ♥</h1>
                      <h1 className="text-xl font-bold font-montserrat">{totalLikes.toString()}</h1>
              </div>
              <div className="w-full md:w-1/2">
                <Card address={truncateEthAddress(currentAccount)}/>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold">You need to register an account</h1>
            <label
                className="font-bold mt-16"
                style={{ display: "flex", alignItems: "center" }}
              >
                Username
              </label>
        
              <input
                type="text"
                onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded-md w-full outline-none mb-5"
                placeholder="epic username"
                name="username"
                value={inputValue.username}
                required
              />
        
              <label className="font-bold mt-5">Role</label>
                <div className="mt-2">
                  <button
                    onClick={() => handleRoleChange("Content Creator")}
                    className={`py-2 px-4 rounded ${inputValue.isAdvitiser ? '' : 'bg-blue-500 text-white'}`}
                  >
                    Content Creator
                  </button>
                  <button
                    onClick={() => handleRoleChange("Adviser")}
                    className={`ml-3 py-2 px-4 rounded ${inputValue.isAdvitiser ? 'bg-blue-500 text-white' : ''}`}
                  >
                    Adviser
                  </button>
                </div>
        
                <p className="mt-5 font-bold">You picked: {inputValue.isAdvitiser ? "Adviser" : "Content Creator"}</p>
        
                <button 
                  className="border-2 border-black p-2 rounded-lg hover:bg-black hover:text-white hover:ease-in-out-800 transition"
                  onClick={registerAccount}
                >
                  Create Account!
                </button>
            </div>
        )
      ) : (
        <div />
      )}
    </div>
  );
};

export default Profile;



import React, { useState, useEffect } from "react";
import { Banner, Card, FormForAds } from "../components";
import Head from "next/head";
import { ethers } from "ethers";
import abi from '../components/data/Videre.json'
import { MetaMaskSDK } from '@metamask/sdk';
import {NoRegister} from '../components';

const UploadAds = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isRegistered, setIsRegistered] = useState(true)

   const options = {
     dappMetadata: { name: "My Dapp", url: "https://mydapp.com" },
     injectProvider: true
   };
   const MMSDK = new MetaMaskSDK(options);
   const ethereum = MMSDK.getProvider();

  const contractAddress = '0xAd4f805527BC493E9ba3721ECa01d635d43B4c32' 
  const contractABI = abi.abi
  const [videreContract, setVidereContract] = useState(null);

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
          if (userInfo[5] == true) {
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
    
    <div>
      {isRegistered ? (
        <>
          <FormForAds />
        </>
      ) : (
        <NoRegister />
            )}
    </div>
  );
};

export default UploadAds;

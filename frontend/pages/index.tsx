<<<<<<< Updated upstream
import { MetaMaskSDK } from '@metamask/sdk';
import React, { useEffect, useState } from "react";

import { Navbar } from "../components";

const Home: NextPage = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  const options = {
    dappMetadata: { name: "My Dapp", url: "https://mydapp.com" },
    injectProvider: true
  };

  const MMSDK = new MetaMaskSDK(options);
  const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum

  const connectWallet = async () => {
    try {
      // Request user accounts from MetaMask
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      // Update the current account state variable
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
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
  }, []);

  return (
    <div>
      <h1>Videre</h1>
      {!currentAccount ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>Connected Account: {currentAccount}</p>
      )}
=======
import React from 'react';
import type {NextPage} from 'next';
import {Banner} from '../components';

const Home : NextPage = () => {
  return (
    <div className='flex flex-col gap-10 h-full'>
    <Banner />
>>>>>>> Stashed changes
    </div>
  );
};

<<<<<<< Updated upstream
export default Home;
=======
export default Home;
>>>>>>> Stashed changes

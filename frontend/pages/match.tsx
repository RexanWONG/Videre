import React, { useState, useEffect } from 'react'
import { ethers } from "ethers";
import abi from "../components/data/Videre.json";
import MetaMaskSDK from "@metamask/sdk";

const match = () => {
  const contractAddress = "0x0784405c4438fc61f013fD00Eaabb1962c5952e9";
  const contractABI = abi.abi;
  const [videreContract, setVidereContract] = useState(null);

  const options = {
    dappMetadata: { name: "My Dapp", url: "https://mydapp.com" },
    injectProvider: true
  };

  const MMSDK = new MetaMaskSDK(options);
  const ethereum = MMSDK.getProvider();

  const [inputValue, setInputValue] = useState({
    adId: 0,
    vidId: 0
  });

  const handleInputChange = (event) => {
    setInputValue((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    const initEthereum = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const videreContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setVidereContract(videreContract);
    };

    initEthereum();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold'>
           Ads with Content
        </h1>
        <p>Connect your ads with user content.  Get recgonition, stake some MATIC</p>

        <label>
          Ad ID to request : 
        </label>

        <input
              type="number"
              onChange={handleInputChange}
              className="border border-gray-400 p-2 rounded-md w-full outline-none mb-5"
              name="name"
              value={inputValue.adId}
              required
        />

        <label>
          Video ID to request : 
        </label>

        <input
              type="number"
              onChange={handleInputChange}
              className="border border-gray-400 p-2 rounded-md w-full outline-none mb-5"
              name="name"
              value={inputValue.vidId}
              required
        />
        
    </div>
  )
}

export default match
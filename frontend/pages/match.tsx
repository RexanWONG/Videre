import React, { useState, useEffect } from 'react'
import { ethers } from "ethers";
import abi from "../components/data/Videre.json";

const match = () => {
  const contractAddress = "0x0784405c4438fc61f013fD00Eaabb1962c5952e9";
  const contractABI = abi.abi;
  const [videreContract, setVidereContract] = useState(null);

  const getUserOwnedAds = async () => {
    try {
        let ads = []
        let numOfVideos = await videreContract.getNumbers();
        const numberOfVideos = numOfVideos[1].toString(); 
    } catch (error) {
        
    }
  }

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
<<<<<<< Updated upstream
    <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold'>
           Ads with Content
        </h1>
        <p>Connect your ads with user content.  Get recgonition, stake some MATIC</p>
    </div>
=======
   <h1>s</h1> 
>>>>>>> Stashed changes
  )
}

export default match
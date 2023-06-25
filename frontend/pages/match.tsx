import React, { useState, useEffect } from 'react'
import { ethers } from "ethers";
import abi from "../components/data/Videre.json";
import truncateEthAddress from 'truncate-eth-address';

const match = () => {
  const contractAddress = "0x0784405c4438fc61f013fD00Eaabb1962c5952e9";
  const contractABI = abi.abi;
  const [videreContract, setVidereContract] = useState(null);
  const [listOfAds, setListOfAds] = useState([])

  const options = {
    dappMetadata: { name: "My Dapp", url: "https://mydapp.com" },
    injectProvider: true
  };

  const [inputValue, setInputValue] = useState({
    adId: "0",
    vidId: "0"
  });

  const handleInputChange = (event) => {
    setInputValue((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const matchAdContent = async () => {
    try {
      const match = await videreContract.matchAdContent(
        inputValue.adId,
        inputValue.vidId
      )

      await match.wait()
      alert("Matched!")
    } catch (error) {
      alert(error)
    }
  }

  const getAds = async () => {
    try {
      let ads = [];
      let numOfAds = await videreContract.getNumbers();
      const numberOfAds = numOfAds[1].toString();

      for (let i = 0 ; i < numberOfAds ; i++) {
        const ad = await videreContract.getAdvertisement(i)

        ads.push(ad)
      }

      setListOfAds(ads)
      console.log(ads)

    } catch (error) {
      alert(error)
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
    <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold'>
           Ads with Content
        </h1>
        <p>Connect your ads with user content.  Get recgonition, stake some MATIC</p>

        <label>
          Ad ID to request : 
        </label>

        <input
              type="string"
              onChange={handleInputChange}
              className="border border-gray-400 p-2 rounded-md w-full outline-none mb-5"
              name="adId"
              value={inputValue.adId}
              required
        />

        <label>
          Vid ID to request : 
        </label>

        <input
              type="string"
              onChange={handleInputChange}
              className="border border-gray-400 p-2 rounded-md w-full outline-none mb-5"
              name="vidId"
              value={inputValue.vidId}
              required
        />  
        

        <button onClick={matchAdContent} className='border-2 border-purple-600 p-2 bg-purple-400 text-white rounded-full hover:bg-purple-600 hover:text-white hover:ease-in-out-800 transition'>
          Match
        </button>

        <button onClick={getAds} className='border-2 border-black bg-white hover:text-white hover:bg-black p-2 rounded-lg mt-16'>
            Get Information
        </button>

        <div className='flex flex-row items-center justify-center gap-16'>
            <div className='flex flex-col'>
              {listOfAds.map((ad, adIndex) => {
                return (
                  <div key={adIndex}>
                    <p>ID : {(ad[0]).toString()}</p>
                    <p>Title : {ad[1]}</p>
                    <p>Creator : {truncateEthAddress(ad[2])}</p>
                  </div>
                )
              })}
            </div>
        </div>
    </div>
  )
}

export default match
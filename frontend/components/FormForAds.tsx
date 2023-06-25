import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import abi from '../components/data/Videre.json'
import { create as ipfsHttpClient } from "ipfs-http-client";
import { AiFillPlusCircle, AiFillCloseCircle } from "react-icons/ai";
import { BiCloudUpload } from "react-icons/bi";

const FormForAds = () => {
  const contractAddress = '0x0784405c4438fc61f013fD00Eaabb1962c5952e9' 
  const contractABI = abi.abi
  const [videreContract, setVidereContract] = useState(null);
  const [uploadedOntoIpfs, setUploadedOntoIpfs] = useState(false);
  const [videoInserted, setVideoInserted] = useState(false);
  const [keyword, setKeyword] = useState(""); 
  const [transactionProcessing, setTransactionProcessing] = useState(false);

  const [inputValue, setInputValue] = useState({
    name: "",
    contentIpfsHash: "",
    listOfKeywords: [],
    stakeAmount: 0
  });

  const projectId = "2QNLEpmDovfuhyECwyNGxTgRiFw";
  const projectSecretKey = "d01edfd18724a5ba82922e0e92dedcbf";
  const authorization =
    "Basic " + btoa(projectId + ":" + projectSecretKey).toString("base64");

  const ipfs = ipfsHttpClient({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: authorization,
    },
  });

  const handleInputChange = (event) => {
    setInputValue((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleStakeAmountChange = (event) => {
    setInputValue((prevFormData) => ({
      ...prevFormData,
      stakeAmount: event.target.value,
    }));
  };

  const uploadImageOntoIpfs = async (file) => {
    const result = await ipfs.add(file);

    console.log(result.path);

    return {
      cid: result.cid,
      path: result.path,
    };
  };

  const handleImageFileChange = async (event) => {
    if (event.target.files[0]) {
      setVideoInserted(true);
      try {
        const ipfsData = await uploadImageOntoIpfs(event.target.files[0]);
        inputValue.contentIpfsHash = ipfsData.path;
        setUploadedOntoIpfs(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const addKeyword = () => {
    const trimmedKeyword = keyword.trim();

    if (trimmedKeyword !== "") {
      const isDuplicate = inputValue.listOfKeywords.some(
        (existingKeyword) =>
          existingKeyword.toLowerCase() === trimmedKeyword.toLowerCase()
      );

      if (!isDuplicate) {
        setInputValue((prevState) => ({
          ...prevState,
          listOfKeywords: [...prevState.listOfKeywords, trimmedKeyword],
        }));
        setKeyword("");
      } else {
        alert("Duplicate Keyword is not allowed. Please try again.");
      }
    } else {
      alert("Keyword cannot be empty");
    }
  };

  const deleteKeyword = (keyword) => {
    setInputValue((prevState) => ({
      ...prevState,
      listOfKeywords: prevState.listOfKeywords.filter(
        (existingKeyword) => existingKeyword !== keyword
      ),
    }));
  };

  const handleCreateAdvertisement = async () => {
    setTransactionProcessing(true);
    try {
      const transaction = await videreContract.createAdvertisement(
        inputValue.name,
        inputValue.contentIpfsHash,
        inputValue.listOfKeywords,
        ethers.utils.parseEther(inputValue.stakeAmount.toString()),
        {
          value: ethers.utils.parseEther(inputValue.stakeAmount.toString())
        }
      );

      const transactionResult = await transaction.wait();
      setTransactionProcessing(false);

      if (transactionResult.status === 1) {
        alert('Advertisement created successfully');
      } else {
        alert('Transaction failed');
      }
    } catch (error) {
      console.log(error);
      setTransactionProcessing(false);
    }
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
    <div>
      <form>
        <label>
          Name of ad
        </label>

        <input
          type="text"
          onChange={handleInputChange}
          className="border border-gray-400 p-2 rounded-md w-full outline-none mb-5"
          placeholder="title of your epic ad"
          name="name"
          value={inputValue.name}
          required
        />

        <label>
          Select a video/image for ad
        </label>
        <input  
            type="file"
            onChange={handleImageFileChange}
            className="border border-gray-400 p-2 rounded-md w-full outline-none mb-5" 
            name="file"
        />

        {uploadedOntoIpfs ? (
          <h1 className='text-green-600 mb-5'>Uploaded onto ipfs! - {inputValue.contentIpfsHash}</h1>
        ) : (
          videoInserted ? (
            <h1>Uploading onto ipfs...</h1>
          ) : (
            <h1 />
          )
        )}
        
        <label
              className="font-bold"
              style={{ display: "flex", alignItems: "center" }}
            >
              Keywords
            </label>
            <div className="flex">
              <input
                type="text"
                onChange={handleKeywordChange}
                className="border border-gray-400 p-2 rounded-md w-full outline-none mb-5 mr-2"
                placeholder="add one Keyword at a time"
                value={keyword}
                required
              />
              <button
                type="button"
                onClick={addKeyword}
                className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add <AiFillPlusCircle className="ml-2" />
              </button>
            </div>

            <ul>
              {inputValue.listOfKeywords.map((keyword, index) => (
                <li key={index} className="mb-2 text-lg">
                  <div className="rounded-full bg-gray-200 px-4 py-2 inline-flex items-center">
                    {keyword}
                    <button
                      className="ml-2"
                      onClick={() => deleteKeyword(keyword)}
                    >
                      <AiFillCloseCircle />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <label>
          Stake Amount
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          onChange={handleStakeAmountChange}
          className="border border-gray-400 p-2 rounded-md w-full outline-none mb-5"
          placeholder="Amount to stake in Ether"
          name="stakeAmount"
          value={inputValue.stakeAmount}
          required
        />
        <button
          type="button"
          onClick={handleCreateAdvertisement}
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={transactionProcessing}
        >
          {transactionProcessing ? "Processing..." : "Create Ad"} 
        </button>

      </form>
    </div>
  )
}

export default FormForAds
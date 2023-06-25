import { useState, useEffect, useRef } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { ethers } from "ethers";
import { AiFillPlusCircle, AiFillCloseCircle } from "react-icons/ai";
import { BiCloudUpload } from "react-icons/bi";
import abi from "../components/data/Videre.json";
import Upload from "../assets/upload.jpg";
import Image from "next/image";

const Form = () => {
  const [uploadedOntoIpfs, setUploadedOntoIpfs] = useState(false);
  const [videoInserted, setVideoInserted] = useState(false);
  const [keyword, setKeyword] = useState(""); // Add this line to manage keyword input state
  const [metadataURI, setMetadataURI] = useState("");
  const [contentIpfsHash, setContentIpfsHash] = useState("");

  const contractAddress = "0x78584CE63aeCd8943D8A4119e679902fdA0B8C2d";
  const contractABI = abi.abi;
  const [videreContract, setVidereContract] = useState(null);

  const [inputValue, setInputValue] = useState({
    name: "",
    contentIpfsHash: "",
    listOfKeywords: [],
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

  const uploadImageOntoIpfs = async (file) => {
    const result = await ipfs.add(file);

    console.log(result.path);

    return {
      cid: result.cid,
      path: result.path,
    };
  };

  const createVideo = async () => {
    try {
      console.log("creating");
      const upload = await videreContract.createVideo(
        inputValue.name,
        contentIpfsHash,
        inputValue.listOfKeywords,
        metadataURI
      );

      await upload.wait();

      alert("Created!");
    } catch (error) {
      alert(error);
    }
  };

  const createMetadata = async () => {
    try {
      const metadata = {
        name: inputValue.name,
        image: "ipfs://" + inputValue.contentIpfsHash,
      };

      const { path } = await ipfs.add(JSON.stringify(metadata));
      const metadataUri = "ipfs://" + path;

      setMetadataURI(metadataUri);
    } catch (error) {
      alert("Error with creating metadata", error);
    }
  };

  const handleImageFileChange = async (event) => {
    if (event.target.files[0]) {
      setVideoInserted(true);
      try {
        const ipfsData = await uploadImageOntoIpfs(event.target.files[0]);
        setContentIpfsHash(ipfsData.path);
        inputValue.contentIpfsHash = ipfsData.path;
        setUploadedOntoIpfs(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [isDragOver, setIsDragOver] = useState(false);


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


  const handleDrop = async (event) => {
    event.preventDefault();
    setIsDragOver(false); // Reset the drag-over state
    const file = event.dataTransfer.files[0];
    if (file) {
      setVideoInserted(true);
      try {
        const ipfsData = await uploadImageOntoIpfs(file);
        setContentIpfsHash(ipfsData.path);
        inputValue.contentIpfsHash = ipfsData.path;
        setUploadedOntoIpfs(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false); // Reset the drag-over state
  };


  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center justify-center font-raleway">
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-1/2">
          <h1 className="font-bold font-montserrat text-3xl text-left pl-0">
            Upload
          </h1>
          <h1 className="font-bold font-montserrat text-l text-left pl-0">
            Create. Discover. Share.{" "}
          </h1>
          <div className="w-3/4">
            <div className="my-4">
              <Image src={Upload} alt="Upload" />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <form>
            <label
              className="font-bold"
              style={{ display: "flex", alignItems: "center" }}
            >
              Video Title
            </label>

            <input
              type="text"
              onChange={handleInputChange}
              className="border border-gray-400 p-2 rounded-md w-full outline-none mb-5"
              placeholder="title of your epic video"
              name="name"
              value={inputValue.name}
              required
            />
            <label
            id="fileInput"
              className="font-bold"
              style={{ display: "flex", alignItems: "center" }}
            >
              Cover Image
            </label>
            <div
        className={`border-dashed rounded-xl border-4 ${
          isDragOver ? "border-green-300 hover:bg-gray-100" : "border-gray-200"
        } flex flex-col justify-center items-center outline-none mt-1 w-[280px] h-[200px] p-10 cursor-pointer`}
        onClick={handleUploadClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
      <div className="flex items-center justify-center bg-gray-200 rounded-full w-16 h-16 mb-5">
        <BiCloudUpload size={48} />
      </div>
      <h1 className="text-center">Upload or drag your cover image file.</h1>
      <input
        ref={fileInputRef}
        id="fileInput"
        type="file"
        accept="video/*"
        onChange={handleImageFileChange}
        className="hidden"
        name="file"
        required
      />
    </div>

            {videoInserted && uploadedOntoIpfs ? (
              <h1 className="text-green-600 mb-2 text-center whitespace-normal flex-wrap">
                Uploaded onto ipfs! - {contentIpfsHash}
              </h1>
            ) : videoInserted ? (
              <h1 className="text-center">Uploading onto ipfs...</h1>
            ) : (
              <h1 />
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
          </form>

          <button
            onClick={createMetadata}
            className="border-2 border-black p-2 rounded-lg hover:bg-black hover:text-white hover:ease-in-out-800 transition"
          >
            Create metadata URI
          </button>

          <h1>{metadataURI}</h1>

          {metadataURI &&
            inputValue.name &&
            inputValue.contentIpfsHash &&
            inputValue.listOfKeywords.length > 0 && (
              <button
                onClick={createVideo}
                className="text-white bg-pink-500 p-2 rounded-lg hover:animate-pulse hover:opacity-80 mt-5"
              >
                Create Video!
              </button>
            )}

          {metadataURI &&
            !(
              inputValue.name &&
              inputValue.contentIpfsHash &&
              inputValue.listOfKeywords.length > 0
            ) && (
              <p className="text-red-500">
                Please fill in all fields before creating the video.
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default Form;

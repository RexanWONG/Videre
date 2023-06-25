import { useState, useEffect } from 'react'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { ethers } from "ethers";
import {AiFillPlusCircle} from "react-icons/ai"
import abi from '../components/data/Videre.json'

const Form = () => {
  const [uploadedOntoIpfs, setUploadedOntoIpfs] = useState(false)
  const [videoInserted, setVideoInserted] = useState(false)
  const [keyword, setKeyword] = useState(''); // Add this line to manage keyword input state
  const [metadataURI, setMetadataURI] = useState('')
  const [contentIpfsHash, setContentIpfsHash] = useState('')

  const contractAddress = '0xC7652D2fAB1fBe30D5C939965f38f4F552221EF0' 
  const contractABI = abi.abi
  const [videreContract, setVidereContract] = useState(null);

  const [inputValue, setInputValue] = useState({
    name: "",
    contentIpfsHash: "",
    listOfKeywords: []
  });

  const projectId = '2QNLEpmDovfuhyECwyNGxTgRiFw'
  const projectSecretKey = 'd01edfd18724a5ba82922e0e92dedcbf'
  const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey).toString('base64');

  const ipfs = ipfsHttpClient({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
          authorization: authorization,
      }
  });

  const handleInputChange = (event) => {
    setInputValue(prevFormData => ({ ...prevFormData, [event.target.name]: event.target.value }));
  } 

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  }

  const addKeyword = () => {
    setInputValue(prevState => ({
      ...prevState,
      listOfKeywords: [...prevState.listOfKeywords, keyword],
    }));
    setKeyword('');
  }

  const uploadImageOntoIpfs = async (file) => {
    const result = await ipfs.add(file)

    console.log(result.path)
        
    return {
        cid : result.cid,
        path: result.path
    }
  }

  const createVideo = async () => {
    try {
      console.log("creating")
      const upload = await videreContract.createVideo(
        inputValue.name, contentIpfsHash, inputValue.listOfKeywords, metadataURI
      )

      await upload.wait()

      alert("Created!")
    } catch (error) {
      alert(error)
    }
  }

  const createMetadata = async () => {
    try {
      const metadata = {
          name: inputValue.name,
          image: "ipfs://" + inputValue.contentIpfsHash
      };
  
      const { path } = await ipfs.add(JSON.stringify(metadata));
      const metadataUri = "ipfs://" + path;
  
      setMetadataURI(metadataUri)
    } catch (error) {
      alert("Error with creating metadata", error)
    }
}

  const handleImageFileChange = async (event) => {
    if (event.target.files[0]) {
      setVideoInserted(true)
      try {
        const ipfsData = await uploadImageOntoIpfs(event.target.files[0]);
        setContentIpfsHash(ipfsData.path)
        inputValue.contentIpfsHash = ipfsData.path
        setUploadedOntoIpfs(true)

      } catch (error) {
        console.log(error); 
      }
    }  
  };

  useEffect(() => {
    const initEthereum = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const videreContract = new ethers.Contract(contractAddress, contractABI, signer);
      setVidereContract(videreContract);
    };

    initEthereum()
  }, [])
  
  
  return (
    <div className='flex flex-col items-center justify-center font-raleway'>
      <div className='mt-10'>
        <h1 className='font-bold'>Upload Video Content</h1>
      </div>

      <div className='mt-10'>
        <form>
        <label className='font-bold' style={{ display: 'flex', alignItems: 'center' }}>
  Video Title
</label>

          <input  
              type="text" 
              onChange={handleInputChange}
              className="border border-gray-400 p-2 rounded-md w-full outline-none mb-5" 
              placeholder="I SAW VITALIK AT ETH GLOBAL WATERLOO"
              name="name"
              value={inputValue.name}
              required
          />

<label className='font-bold' style={{ display: 'flex', alignItems: 'center' }}>
            Cover Image 
          </label>
          <input  
              type="file"
              onChange={handleImageFileChange}
              className="border border-gray-400 p-2 rounded-md w-full outline-none mb-5" 
              name="file"
              required
          />

          {videoInserted && uploadedOntoIpfs ? (
              <h1 className='text-green-600 mb-5'>Uploaded onto ipfs! - {contentIpfsHash}</h1>
          ) : (
              videoInserted ? (
                <h1>Uploading onto ipfs...</h1>
            ) : (
                <h1 />
            )
          )}

<label className='font-bold' style={{ display: 'flex', alignItems: 'center' }}>
            List of keywords 
          </label>
          <div className="flex">
            <input  
                type="text"
                onChange={handleKeywordChange}
                className="border border-gray-400 p-2 rounded-md w-full outline-none mb-5 mr-2" 
                placeholder='Add 1 keyword at a time!  Your keywords will appear below'
                value={keyword}
                required 
            />
          <button type="button" onClick={addKeyword} className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Add <AiFillPlusCircle className="ml-2" />
</button>
          </div>
          <ul>
            {inputValue.listOfKeywords.map((keyword, index) => (
              <li key={index} className="mb-2 text-lg">
                {keyword}
              </li>
            ))}
          </ul>
        </form>

        <button onClick={createMetadata} className='border-2 border-black p-2 rounded-lg hover:bg-black hover:text-white hover:ease-in-out-800 transition'> 
              Create metadata URI
        </button>

        <h1>{metadataURI}</h1>

        {metadataURI && (
            <button 
              onClick={createVideo}
              className='text-white bg-pink-500 p-2 rounded-lg hover:animate-pulse hover:opacity-80 mt-5'
            >
              Create Video!
            </button>
          )}
      </div>
    </div>
  )
}

export default Form
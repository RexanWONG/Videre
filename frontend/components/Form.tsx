import { useState } from 'react'
import { create as ipfsHttpClient } from 'ipfs-http-client'

const Form = () => {
  const [uploadedOntoIpfs, setUploadedOntoIpfs] = useState(false)
  const [videoInserted, setVideoInserted] = useState(false)
  const [keyword, setKeyword] = useState(''); // Add this line to manage keyword input state
  const [metadataURI, setMetadataURI] = useState('')

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

  async function createMetadata() {
    try {
      const metadata = {
          name: inputValue.name,
          image: "ipfs://" + inputValue.contentIpfsHash
      };
  
      const { path } = await ipfs.add(JSON.stringify(metadata));
      const metadataUri = "ipfs://" + path;
  
      setMetadataURI(metadataURI)
    } catch (error) {
      alert("Error with creating metadata", error)
    }
}

  const handleImageFileChange = async (event) => {
    if (event.target.files[0]) {
      setVideoInserted(true)
      try {
        const ipfsData = await uploadImageOntoIpfs(event.target.files[0]);
        inputValue.contentIpfsHash = ipfsData.path
        setUploadedOntoIpfs(true)

      } catch (error) {
        console.log(error); 
      }
    }  
  };
  
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='mt-10'>
        <h1 className='font-bold'>Upload Video</h1>
      </div>

      <div className='mt-10'>
        <form>
          <label className=''>
              Name of video
          </label>

          <input  
              type="text" 
              onChange={handleInputChange}
              className="border border-gray-400 p-2 rounded-md w-full outline-none mb-5" 
              placeholder="I SAW VITALIK AT ETH GLOBAL WATERLOO"
              name="name"
              value={inputValue.name}
          />

          <label className='font-bold'>
            Image - select an image representing your event
          </label>
          <input  
              type="file"
              onChange={handleImageFileChange}
              className="border border-gray-400 p-2 rounded-md w-full outline-none mb-5" 
              name="file"
          />

          {videoInserted && uploadedOntoIpfs ? (
              <h1 className='text-green-600 mb-5'>Uploaded onto ipfs! - {inputValue.contentIpfsHash}</h1>
          ) : (
              videoInserted ? (
                <h1>Uploading onto ipfs...</h1>
            ) : (
                <h1 />
            )
          )}

          <label className='font-bold'>
            List of keywords
          </label>
          <div className="flex">
            <input  
                type="text"
                onChange={handleKeywordChange}
                className="border border-gray-400 p-2 rounded-md w-full outline-none mb-5 mr-2" 
                placeholder='Add 1 keyword at a time!  Your keywords will appear below'
                value={keyword}
            />
            <button type="button" onClick={addKeyword} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Keyword
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

        <button onClick={createMetadata}>

        </button>
      </div>
    </div>
  )
}

export default Form

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from '../components/data/Videre.json';


const Content = () => {
    const contractAddress = '0x78584CE63aeCd8943D8A4119e679902fdA0B8C2d'; 
    const contractABI = abi.abi;
    const [videreContract, setVidereContract] = useState(null);
    const [videos, setVideos] = useState([]); 

    const getVideos = async () => {
        try {
            let videoList = [];
            let numOfVideos = await videreContract.getNumbers();
            const numberOfVideos = numOfVideos[1].toString();
            console.log(numberOfVideos);

            for (let i = 0 ; i < numberOfVideos ; i++) {
                const video = await videreContract.getVideo(i);
                videoList.push(video);
            }

            console.log(videoList);
            setVideos(videoList); // <--- Add this line
        } catch (error) {
            console.error(error);
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
        <div className='flex flex-col items-center justify-center mt-10'>
            <button onClick={getVideos} className='text-2xl font-bold border-2 border-black rounded-lg p-2 hover:bg-black hover:text-white hover:animate-pulse'>
                Refresh Feed
            </button>

            <div>
                {videos.map((item, index) => ( // <--- Change this line
                    <div key={index}>
                        <h1 className='text-4xl font-bold'>{item[1]}</h1>
                        <p>BY {item[2]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Content;

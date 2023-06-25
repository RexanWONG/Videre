import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from '../components/data/Videre.json';
import truncateEthAddress from 'truncate-eth-address';
import ReactPlayer from 'react-player';
import { AiOutlineHeart } from 'react-icons/ai'

const Content = () => {
    const contractAddress = '0x0784405c4438fc61f013fD00Eaabb1962c5952e9'; 
    const contractABI = abi.abi;
    const [videreContract, setVidereContract] = useState(null);
    const [videos, setVideos] = useState([]); 

    const getVideosWithLikes = async () => {
        try {
            let videoList = [];
            let numOfVideos = await videreContract.getNumbers();
            const numberOfVideos = numOfVideos[1].toString();
            console.log(numberOfVideos);
    
            for (let i = 0 ; i < numberOfVideos ; i++) {
                const video = await videreContract.getVideo(i);
                const videoLikeInfo = await videreContract.getVideoLikesInfo(i);
    
                // Combine video and likes info into one object
                videoList.push({
                    ...video,
                    likes: videoLikeInfo[0].toString(), // Assuming the first element of videoLikeInfo is the number of likes
                    likedBy: videoLikeInfo[1] // Assuming the second element of videoLikeInfo is the list of addresses who liked the video
                });
            }
    
            console.log(videoList);
            setVideos(videoList.reverse()); 
        } catch (error) {
            console.error(error);
        }
    };
    
    // Update the useEffect hook
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
            getVideosWithLikes(); // Get videos with likes info after setting up the contract
        };
    
        initEthereum();
    }, [])

    const likeVideo = async (_id) => {
        try {
            const like = await videreContract.likeVideo(_id)
            await like.wait()

            alert("Liked post!")
        } catch (error) {
            alert("Error with liking video : ", error)
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
        <div className='flex flex-col items-center justify-center mt-10'>
            <button onClick={getVideosWithLikes} className='text-2xl font-bold border-2 border-black rounded-lg p-2 hover:bg-black hover:text-white hover:animate-pulse'>
                Refresh Feed
            </button>

            <div className='mt-16'>
            {videos.map((video, videoIndex) => (
                <div key={videoIndex}>
                    <h1 className='text-4xl font-bold'>{video[1]}</h1>
                    <p className='text-gray-500 mb-5'>By {truncateEthAddress(video[2])}</p>

                    <div className='flex flex-row items-center justify-center'>
                        <div className='flex flex-col items-start justify-start'>
                            <div className="border-2 border-gray-400 rounded-lg">
                                <ReactPlayer 
                                    url={`https://ipfs.io/ipfs/${video[3]}`}
                                    controls={true}
                                    width="400px"
                                    height="700px"
                                />
                            </div>
                            <div className='flex flex-row mt-5 mb-16'>
                                <h1 className='text-5xl mr-2'>{video.likes}</h1>    
                                <button onClick={() => likeVideo(video[0])}>
                                    <AiOutlineHeart size={50} color='black' className='hover:bg-red-500'/>
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            ))}

            </div>
        </div>
    );
}

export default Content;

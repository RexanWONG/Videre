// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Videri is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Videri Users Videos", "VUV") {}

    uint256 numofAdvertisements;
    uint256 numOfVideos;

    struct Advertisement {
        uint256 advertisementId;
        string name;
        address creator;
        string contentIpfsHash;
        string[] listOfKeywords;
        uint256[] listOfContentLinked;
        uint256 stakedAmount;
    }

    struct Video {
        uint256 videoId;
        string name;
        address creator;
        uint256 contentTokenID;
        string contentURI;
        string contentIpfsHash;
        string[] listOfKeywords;
        uint256[] listOfAdvertisementsLinked;
        uint256 numOfLikes;
        address[] likedAddresses;
    }

    mapping(uint256 => Advertisement) public _advertisements;
    mapping(uint256 => Video) public _videos;

    function createAdvertisement(
        string memory _name, 
        string memory _contentIpfsHash, 
        string[] memory _listOfKeywords,
        uint256 _stakedAmount
    ) payable public {
        require(bytes(_name).length > 0, "There must be a name to your advertisment");
        require(bytes(_contentIpfsHash).length > 0, "There must be an asset to your advertisment");
        require(_listOfKeywords.length <= 10, "You can only have up to 10 keywords");
        require(_stakedAmount > 0, "Staked amount must be greater than zero ETH");
        require(msg.value == _stakedAmount, "Value sent must be same as your specified staked amount");

        Advertisement storage newAdvertisement = _advertisements[numofAdvertisements];

        newAdvertisement.advertisementId = numofAdvertisements;
        newAdvertisement.name = _name;
        newAdvertisement.creator = msg.sender;
        newAdvertisement.contentIpfsHash = _contentIpfsHash;
        newAdvertisement.listOfKeywords = _listOfKeywords;
        newAdvertisement.stakedAmount = _stakedAmount;

        numofAdvertisements++;
    } 

    function uploadVideo(
        string memory _name,
        string memory _contentIpfsHash,
        string[] memory _listOfKeywords,
        string memory uri
    ) public {
        require(bytes(_name).length > 0, "There must be a name to your video");
        require(bytes(_contentIpfsHash).length > 0, "There must be a video to your upload");
        require(_listOfKeywords.length <= 10, "You can only have up to 10 keywords");
        require(bytes(uri).length > 0, "There must be a URI to your video");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);

        Video storage newVideo = _videos[numOfVideos];

        newVideo.videoId = numOfVideos;
        newVideo.name = _name;
        newVideo.creator = msg.sender;
        newVideo.contentTokenID = tokenId;
        newVideo.contentURI = uri;
        newVideo.contentIpfsHash = _contentIpfsHash;
        newVideo.listOfKeywords = _listOfKeywords;
        newVideo.numOfLikes = 0;

        numOfVideos++;
    }  

    function likeVideo(uint256 _videoId) public {
        Video storage video = _videos[_videoId];

        uint256 count = 0;

        for (uint256 i = 0 ; i < video.likedAddresses.length ; ++i) {
            if (video.likedAddresses[i] != msg.sender) {
                count++;
            }
        }

        require(count == video.likedAddresses.length, "You have already liked the post");

        video.numOfLikes++;
        video.likedAddresses.push(msg.sender);
    }

    // View functions 
    function getAdvertisement(uint256 _advertisementId) public view returns (
        uint256, string memory, address, string memory, string[] memory, uint256[] memory, uint256
    ) {
        return (
            _advertisements[_advertisementId].advertisementId,
            _advertisements[_advertisementId].name,
            _advertisements[_advertisementId].creator,
            _advertisements[_advertisementId].contentIpfsHash,
            _advertisements[_advertisementId].listOfKeywords,
            _advertisements[_advertisementId].listOfContentLinked,
            _advertisements[_advertisementId].stakedAmount
        );
    }

    function getVideo(uint256 _videoId) public view returns (
        uint256, string memory, address, string memory, string[] memory, uint256[] memory
    ) {
        return (
            _videos[_videoId].videoId,
            _videos[_videoId].name,
            _videos[_videoId].creator,
            _videos[_videoId].contentIpfsHash,
            _videos[_videoId].listOfKeywords,
            _videos[_videoId].listOfAdvertisementsLinked
        );
    }

    function getVideoBlockchainDetails(uint256 _videoId) public view returns (uint256, string memory) {
        return (
            _videos[_videoId].contentTokenID,
            _videos[_videoId].contentURI
        );
    }

    function getNumOfLikes(uint256 _videoId) public view returns (uint256) {
        return _videos[_videoId].numOfLikes;
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Videri {
    uint256 numofAdvertisements;
    uint256 numOfVideos;

    struct Advertisement {
        uint256 advertisementId;
        string name;
        address creator;
        string company;
        string contentIpfsHash;
        string[] listOfKeywords;
        uint256[] listOfContentLinked;
        uint256 numOfContentLinked;
        uint256 stakedAmount;
    }

    mapping(uint256 => Advertisement) public _advertisements;

    function createAdvertisement(
        string memory _name, 
        string memory _company,
        string memory _contentIpfsHash, 
        string[] memory _listOfKeywords,
        uint256 _stakedAmount
    ) payable public {
        require(bytes(_name).length > 0, "There must be a name to your advertisment");
        require(_stakedAmount > 0, "Staked amount must be greater than zero ETH");
        require(msg.value == _stakedAmount, "Value sent must be same as your specified staked amount");

        Advertisement storage newAdvertisement = _advertisements[numofAdvertisements];

        newAdvertisement.advertisementId = numofAdvertisements;
        newAdvertisement.name = _name;
        newAdvertisement.creator = msg.sender;
        newAdvertisement.company = _company;
        newAdvertisement.contentIpfsHash = _contentIpfsHash;
        newAdvertisement.listOfKeywords = _listOfKeywords;
        newAdvertisement.numOfContentLinked = 0;
        newAdvertisement.stakedAmount = _stakedAmount;

        numofAdvertisements;
    }

    
}
    

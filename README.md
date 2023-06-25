# Videre (ETHGlobal Waterloo 2023) 🎥 💸
Live link: 

Demo video:

Videre is a TikTok-style video-sharing platform that revolutionizes the way content creators interact with users & advertisers. By leveraging token bound accounts (ERC-6551), advertisers can send crypto to the creators’ video NFTs (token bound accounts). Having these video NFTs hold ERC-20 tokens demonstrates how “valuable” the videos are to the creators.

**Creators** can redeem crypto for the videos they upload, with the amount determined by the number of likes their content receives

**Advertisers** send crypto to Videre's smart contract, which are redeemed by creators' video NFTs when desired. Through keywords submitted during the upload process, ads are matched with the appropriate videos. Advertisers also specify how much a content creator gets for every 1000 likes.

Twitter is full of bots. TikTok's algorithm + data is private and they're getting banned everywhere. Some platforms also have censorship rules. Most of them pay their creators poorly. Videre solves these problems.


# How it works 🧠
1. Content creator uploads a video as an NFT (ERC-721)
2. Content creator calls `getAd()` function, which creates a TBA (address) of the ERC-721 (using the ERC-721 tokenID + smart contract address)

### Sample userflow
1. Advertiser wants to put an ad on a creator's video
    - Using keywords, ads are matched with the most related videos
    - Advertiser sends ETH to the Videre smart contract
    - Videre smart contract sends the ETH to the video NFT (TBA), and creator can claim ad rewards (if they call the `withdraw` function)
<img width="1176" alt="VidereUserFlow" src="https://github.com/RexanWONG/Videre/assets/66754344/1b7fb509-c79d-43a7-b0bb-9998938f82cd">

# How it's made 🛠️
Frontend
- We used React and Next.js, written in TypeScript. `truncateEthAddress` was imported to truncate the ETH address on the navbar. Ethers was also used. Contracts were deployed on Polygon Mumbai.

Blockchain
- 1 Solidity smart contract was made to make the token bound accounts, along with numerous other functions. Hardhat was used. 

### Bounties
 
**Token Bound Accounts (ERC-6551)**: video NFTs by creators hold ERC-20 tokens from advertisers

**MetaMask SDK**: for wallet login flow and account info

**IPFS**: video storage through Infura

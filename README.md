# Videre (ETHGlobal Waterloo 2023) 🎥 💸
- Live link: 
- Demo video:

Videre is a video-sharing platform for content creators to earn rewards by sharing their videos to real users & advertisers. 

**Creators** redeem crypto for the videos they upload. The more engagement, the more crypto they earn. Their videos are uploaded as NFTs (token bound accounts), which are able to accept tokens as payment for showing the ads. 

**Advertisers** send crypto to Videre's smart contract, which are redeemed by creators' video NFTs when desired. Through keywords submitted during the upload process, ads are matched with the appropriate videos. Advertisers also specify how much a content creator gets for every 1000 likes.

**Users** scroll through high-quality TikTok-style videos, 

# How it works 🧠
1. Content creator uploads a video as an NFT (ERC-721)
2. Content creator calls `getAd()` function, which creates a TBA (address) of the ERC-721 (using the ERC-721 tokenID + smart contract address)

### Sample workflow
1. Advertiser wants to put an ad on a creator's video
    - Using keywords, ads are matched with the most related videos
    - Advertiser sends ETH to the Videre smart contract
    - Videre smart contract sends the ETH to the video NFT (TBA), and creator can claim ad rewards (if they call the `withdraw` function)
<img width="1176" alt="VidereUserFlow" src="https://github.com/RexanWONG/Videre/assets/66754344/1b7fb509-c79d-43a7-b0bb-9998938f82cd">

# How it's made 🛠️

### Bounties
**Token Bound Accounts (ERC-6551)**: video NFTs by creators hold ERC-20 tokens from advertisers

**MetaMask SDK**: for wallet login flow and account info

**IPFS**: video storage through Infura

require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv");
dotenv.config()

module.exports = {
  solidity: "0.8.9",
  networks: {
    mumbai: {
      url: process.env.URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};

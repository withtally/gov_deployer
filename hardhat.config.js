require("@nomiclabs/hardhat-waffle");
require("dotenv").config();


/* ========== DATA FROM .env ===========*/
// Private key
const PRIVATE_KEY = process.env.PRIVATE_KEY
// Ethereum network nodes
const ETHEREUM_URL = process.env.ETHEREUM_URL
const GOERLI_URL = process.env.GOERLI_URL
const RINKEBY_URL = process.env.RINKEBY_URL
const KOVAN_URL = process.env.KOVAN_URL
// Polygon network nodes
const POLYGON_URL = process.env.POLYGON_URL
const MUMBAI_URL = process.env.MUMBAI_URL
// Avalanche network nodes
const AVALANCHE_URL = process.env.AVALANCHE_URL
const FUJI_URL = process.env.FUJI_URL
// Optimism network nodes
const OPTIMISM_URL = process.env.OPTIMISM_URL
const OPT_KOVAN_URL = process.env.OPT_KOVAN_URL

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.5.5",
      },
      {
        version: "0.8.4",
      },
      {
        version: "0.8.10",
      },
      {
        version: "0.5.17",
      },
    ],
  },
  private_key: PRIVATE_KEY,
  networks: {
    localhost: {
      url: "http://localhost:8545",
      accounts: [PRIVATE_KEY],
    },
    ganache: {
      url: "http://localhost:7545",
      accounts: [PRIVATE_KEY],
    },
    // ETH - networks
    // Ethereum config
    ethereum: {
      url: ETHEREUM_URL,
      accounts: [PRIVATE_KEY],
    },
    // Göerli testnet config
    goerli: {
      url: GOERLI_URL,
      accounts: [PRIVATE_KEY],
    },
    // Rinkeby testnet config
    rinkeby: {
      url: RINKEBY_URL,
      accounts: [PRIVATE_KEY],
    },
    // Kovan testnet config
    kovan: {
      url: KOVAN_URL,
      accounts: [PRIVATE_KEY],
    },
    // Polygon (Matic)
    // Polygon mainnet config
    polygon: {
      url: POLYGON_URL,
      accounts: [PRIVATE_KEY],
    },
    // Mumbai
    mumbai: {
      url: MUMBAI_URL,
      accounts: [PRIVATE_KEY],
    },
    // Avalanche mainnet
    // Avalanche config
    avalanche: {
      url: AVALANCHE_URL,
      accounts: [PRIVATE_KEY],
    },
    // Fuji testnet config
    fuji: {
      url: FUJI_URL,
      accounts: [PRIVATE_KEY],
    },
    // Optimism
    // Optimism mainnet config
    optimism: {
      url: OPTIMISM_URL,
      accounts: [PRIVATE_KEY],
    },
    // Optimism Kovan testnet config
    optimism_kovan: {
      url: OPT_KOVAN_URL,
      accounts: [PRIVATE_KEY],
    }
  }
};


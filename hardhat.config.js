////////////////////////////////////////////////////////////////////////////////////////
//                                                                                    //
//      "C~                                                                           //
//  ^'1XUpkhhQ_.                                                                      //
//  ]?{/xXXJZphhc|,                                                                   //
//  ]]]?]]]nzXXJbhhhw"        lqhhhhhhhhhhhhm              nhhh:  uhhu                //
//  I]?]]]]]](|rXXC0whqu      !qhhhhhhhhhhhhm              nhhh:  uhhu                //
//    ^_?]]]]?]]]1uXXLkh           Jhhh:                   nhhh:  uhhu                //
//      ']]]]]]]]]]cXLkh           Jhhh:     ltczzzn[[zzx  xhhh:  uhhu xzz1'    ^zzz  //
//      ']]?]]]]]]?cX(.(           Jhhh:    :hhhhhhhhhhhm  nhhh:  uhhu  hhh:    hhh:  //
//      ']]]]?rXXY('               Jhhh:    hhhr    :hhhm  nhhh:  uhhu  ^Uhh/ :whh[   //
//      ']]]]]rXUhh:               Jhhh:   zhhh:     [hhm  nhhh:  uhhu   lQhkruhhu    //
//      ']]?]]rXUhh:               Jhhh:    hhh|    ]hhhm  nhhh:  uhhu    lqhhhhw:    //
//      ']?]]]rXUhh:               Jhhh:    ihhhqZZwhhhhm  nhhh:  uhhu     mhhhhm     //
//      '_]]]?rXn {^               /ccc^      {cQhmz <ccr  }ccc^  {cc{      hhh_      //
//        '`l]:'I                                                         .mhh/.      //
//                                                                        +phU,       //
//                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////

//----------
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

// requiring tasks.
require("./tasks/compound");

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
const OPT_GOERLI_URL = process.env.OPT_GOERLI_URL
// Arbitrum network nodes
const ARBITRUM_URL = process.env.ARBITRUM_URL
const ARBITRUM_RIN_URL = process.env.ARBITRUM_RIN_URL

// Etherscan key
const ETHERSCAN_KEY = process.env.ETHERSCAN_API_KEY
const POLYGONSCAN_KEY = process.env.POLYGONSCAN_KEY
const SNOWTRACE_KEY = process.env.SNOWTRACE_KEY
const OPT_ETHERSCAN_KEY = process.env.OPT_ETHERSCAN_KEY
const ARBISCAN_KEY = process.env.ARBISCAN_KEY

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.5.5",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.5.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
    ],

  },
  etherscan: {
    // To get the correct names needed run: 
    //  npx hardhat verify --list-networks
    apiKey: {
        mainnet: ETHERSCAN_KEY,
        goerli: ETHERSCAN_KEY,
        rinkeby: ETHERSCAN_KEY,
        kovan: ETHERSCAN_KEY,
        polygon: POLYGONSCAN_KEY,
        polygonMumbai: POLYGONSCAN_KEY,
        avalanche: SNOWTRACE_KEY,
        avalancheFujiTestnet: SNOWTRACE_KEY,
        optimisticEthereum: OPT_ETHERSCAN_KEY,
        optimisticKovan: OPT_ETHERSCAN_KEY,
        arbitrumOne: ARBISCAN_KEY,
        arbitrumTestnet: ARBISCAN_KEY,
    }
  },

  networks: {
    localhost: {
      url: "http://localhost:8545",
      accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"],
    },
    ganache: {
      url: "http://localhost:7545",
      accounts: [PRIVATE_KEY],
    },
    // ETH - networks
    // Ethereum mainnet config
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
    // Polygon (Matic) - networks
    // Polygon mainnet config
    polygon: {
      url: POLYGON_URL,
      accounts: [PRIVATE_KEY],
    },
    // Mumbai testnet config
    mumbai: {
      url: MUMBAI_URL,
      accounts: [PRIVATE_KEY],
    },
    // Avalanche - networks
    // Avalanche mainnet config
    avalanche: {
      url: AVALANCHE_URL,
      accounts: [PRIVATE_KEY],
    },
    // Fuji testnet config
    fuji: {
      url: FUJI_URL,
      accounts: [PRIVATE_KEY],
    },
    // Optimism - networks
    // Optimism mainnet config
    optimism: {
      url: OPTIMISM_URL,
      accounts: [PRIVATE_KEY],
    },
    // Optimism Kovan testnet config
    optimism_kovan: {
      url: OPT_KOVAN_URL,
      accounts: [PRIVATE_KEY],
    },
    // Optimism Goerli testnet config
    optimism_goerli: {
      url: OPT_GOERLI_URL,
      accounts: [PRIVATE_KEY],
    },
    // Arbitrum - networks
    // Arbitrum One mainnet config
    arbitrum: {
      url: ARBITRUM_URL,
      accounts: [PRIVATE_KEY],
    },
    // Arbitrum Rinkeby testnet config
    arbitrum_rinkeby: {
      url: ARBITRUM_RIN_URL,
      accounts: [PRIVATE_KEY],
    }
  }
};


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
require("./tasks/openzeppelin");
require("./tasks/expected_contract.js");


/* ========== DATA FROM .env ===========*/
// Private key
const PRIVATE_KEY = process.env.PRIVATE_KEY
// Ethereum network nodes
const ETHEREUM_URL = process.env.ETHEREUM_URL
const GOERLI_URL = process.env.GOERLI_URL
const SEPOLIA_URL = process.env.SEPOLIA_URL

// Polygon network nodes
const POLYGON_URL = process.env.POLYGON_URL
const MUMBAI_URL = process.env.MUMBAI_URL
// Avalanche network nodes
const AVALANCHE_URL = process.env.AVALANCHE_URL
const FUJI_URL = process.env.FUJI_URL
// Optimism network nodes
const OPTIMISM_URL = process.env.OPTIMISM_URL
const OPT_GOERLI_URL = process.env.OPT_GOERLI_URL
// Arbitrum network nodes
const ARBITRUM_URL = process.env.ARBITRUM_URL
const ARBITRUM_NOVA_URL = process.env.ARBITRUM_NOVA_URL
const ARBITRUM_GOR_URL = process.env.ARBITRUM_GOR_URL
// const ARBITRUM_RIN_URL = process.env.ARBITRUM_RIN_URL


const ZKSYNC_URL = process.env.ZKSYNC_URL
const ZKEVM_URL = process.env.ZKEVM_URL


// Binance network nodes
const BINANCE_URL = process.env.BINANCE_URL
const BINANCE_TESTNET_URL = process.env.BINANCE_TESTNET_URL
// Gnosis netowork nodes
const GNOSIS_URL = process.env.GNOSIS_URL
// Base network nodes
const BASE_GOR_URL = process.env.BASE_GOR_URL
// Scroll network nodes
const SCR_ALPHA_URL = process.env.SCR_ALPHA_URL

// Etherscan key
const ETHERSCAN_KEY = process.env.ETHERSCAN_API_KEY
const POLYGONSCAN_KEY = process.env.POLYGONSCAN_KEY
const SNOWTRACE_KEY = process.env.SNOWTRACE_KEY
const OPT_ETHERSCAN_KEY = process.env.OPT_ETHERSCAN_KEY
const ARBISCAN_KEY = process.env.ARBISCAN_KEY
const BSCSCAN_KEY = process.env.BSCSCAN_KEY
const GNOSISSCAN_KEY = process.env.GNOSISSCAN_KEY
const BASESCAN_KEY = process.env.BASESCAN_KEY
const ZKEVM_POLYGONSCAN_KEY = process.env.ZKEVM_POLYGONSCAN_KEY

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
      sepolia: ETHERSCAN_KEY,
      polygon: POLYGONSCAN_KEY,
      polygonMumbai: POLYGONSCAN_KEY,
      avalanche: SNOWTRACE_KEY,
      avalancheFujiTestnet: SNOWTRACE_KEY,
      optimisticEthereum: OPT_ETHERSCAN_KEY,
      optimisticEthereum: OPT_ETHERSCAN_KEY,
      arbitrumOne: ARBISCAN_KEY,
      arbitrumGoerli: ARBISCAN_KEY,
      // arbitrumNova: ARBISCAN_KEY,
      bsc: BSCSCAN_KEY,
      bscTestnet: BSCSCAN_KEY,
      xdai: GNOSISSCAN_KEY,
      baseGoerli: BASESCAN_KEY,
      'base-goerli': BASESCAN_KEY,
      "scroll-alpha": "EMPTY",
      zkevm: ZKEVM_POLYGONSCAN_KEY,
    },
    customChains: [
      {
        network: "arbitrumGoerli",
        chainId: 421613,
        urls: {
          apiURL: "https://api-goerli.arbiscan.io/api",
          browserURL: "https://goerli.arbiscan.io"
        }
      },
      {
        network: "baseGoerli",
        chainId: 84531,
        urls: {
          apiURL: "https://api-goerli.arbiscan.io/api",
          browserURL: "https://goerli.arbiscan.io"
        }
      },
      {
        network: "base-goerli",
        chainId: 84531,
        urls: {
          apiURL: "https://api-goerli.arbiscan.io/api",
          browserURL: "https://goerli.arbiscan.io"
        }
      },
      {
        network: "zkevm",
        chainId: 1101,
        urls: {
          apiURL:"https://api-zkevm.polygonscan.com/api",
          browserURL: "https://zkevm.polygonscan.com"
        }
      },
      {
        network: "scroll-alpha",
        chainId: 534353,
        urls: {
          apiURL: "https://blockscout.scroll.io/api",
          browserURL: "https://blockscout.scroll.io/"
        }
      }
    ]
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
    // Sepolia testnet config
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
    },
    // // Kovan testnet config
    // kovan: {
    //   url: KOVAN_URL,
    //   accounts: [PRIVATE_KEY],
    // },
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
    // optimism_kovan: {
    //   url: OPT_KOVAN_URL,
    //   accounts: [PRIVATE_KEY],
    // },
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
    arbitrumNova: {
      url: ARBITRUM_NOVA_URL,
      accounts: [PRIVATE_KEY],
    },

    // Arbitrum Goerli testnet config
    arbitrum_goerli: {
      url: ARBITRUM_GOR_URL,
      accounts: [PRIVATE_KEY],
    },
        // Arbitrum Rinkeby testnet config
    // arbitrum_rinkeby: {
    //   url: ARBITRUM_RIN_URL,
    //   accounts: [PRIVATE_KEY],
    // },
    // Binance - networks
    // Binance mainnet config
    binance: {
      url: BINANCE_URL,
      accounts: [PRIVATE_KEY],
    },
    // Binance testnet config
    binance_testnet: {
      url: BINANCE_TESTNET_URL,
      accounts: [PRIVATE_KEY],
    },
    // Gnosis
    gnosis: {
      url: GNOSIS_URL,
      accounts: [PRIVATE_KEY],
    },
    // BAse
    baseGoerli:{
      url: BASE_GOR_URL,
      accounts: [PRIVATE_KEY],
    },
    "base-goerli":{
      url: BASE_GOR_URL,
      accounts: [PRIVATE_KEY],
    },
    "scroll-alpha":{
      url: SCR_ALPHA_URL,
      accounts: [PRIVATE_KEY],
    },
    // ZKSYNC 
    zksync: {
      url: ZKSYNC_URL,
      accounts: [PRIVATE_KEY],
    },
    // Polygon ZkEVM
    zkevm: {
      url: ZKEVM_URL,
      accounts: [PRIVATE_KEY],
    }
  }
};


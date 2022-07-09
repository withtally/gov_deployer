![Theme image for repository](resources/banner.png)
DAO Contracts Deployer
======================
A tool to deploy governance related contracts supported by Tally via CLI.

For now this only deploy Compound Alpha Version.

__Future planning:__
- Compound Bravo.
- OpenZepellin.
- ERC721 deploy and mint.
- Change from Scripts to hardhat Tasks.

----------------------

⚠️⚠️ __WORKING ON IT__ ⚠️⚠️

To skip reading too much click [here](#deployments)
### Pre-Requisites

- Npm and Node.
- Git.

### Installation

```bash
git clone https://github.com/afa7789/gov_deployer.git && cd gov_deployer
yarn install
```

### Networks that Tally support

__Following we have the block explorers and the networks that are supported currently by Tally app.__

#### Ethereum
- Ethereum -  https://etherscan.io/
- Ethereum Testnet Göerli -  https://goerli.etherscan.io/
- Ethereum Testnet Rikenby - https://rinkeby.etherscan.io/
- Ethereum Testnet Kovan - https://kovan.etherscan.io/

#### Polygon
- Polygon (Matic) - https://polygonscan.com/
- Polygon Testnet Mumbai - https://mumbai.polygonscan.com/

#### Avalanche
- Avalanche - https://snowtrace.io/
- Avalanche Testnet Fuji - https://testnet.snowtrace.io/

#### Optimism
- Optimism - https://optimistic.etherscan.io/
- Optimism Kovan - https://kovan-optimistic.etherscan.io/

#### Localhost
- Localhost - http://localhost:8545/
- Blockexplorer I suggest using Ganache: https://github.com/trufflesuite/ganache-ui

To add funds to other accounts you can add the chain to your metamask:
    - Name: Hardhat
    - URL/RPC: http://121.0.0.1:8545 
    - Chain ID: 31337
    - Currency: ETH

Run `npx hardhat node` , it will start the node and print the private_keys and pub_keys, add one of them to your metamask, so you can send funds from that account to others.

If you ever reset the node, the configurations such as block nounce, and other configs in metamask have to be reset. To do so follow these steps: SETTINGS >> ADVANCED >> scroll down >> RESET ACCOUNTS (this will reset the state of them in the networks), and you can use again with localhost.

------------------------------------

# Deployments

In this section we are going to cover all the tasks and deployment possible to be made with gov_deployer.

We are going to list commands to call and their variables to deploy.

By doing so you will now what to call in order to get the scenario and governance that you want.

The network name based in `--network` option, have to follow the network name in the _`hardhat.config.js`_ file.

In all tasks the variable `--network lower_case_name` will be optional with default:localhost

First of all run both of this.
```bash
npx hardhat compile
npx hardhat node # if you're running it locally
```

## Compound

The following scripts will deploy the Compound Alpha version of the governance contracts.

#### Alpha Deployment

Deploy in one go all the contracts to create an Alpha Compound style governance.

```bash
npx hardhat alpha_dao \
    --name DAO_NAME \
    --token TOKEN_NAME \
    --symbol TKN \
    --delay time_in_seconds_between_172800_2592000
    --owner 0x_ADDRESS_OF_OWNER_OF_TOTAL_TOKENS #Optional, default value is the deployer address
    --guardian 0x_ADDRESS_OF_OWNER_OF_TOTAL_TOKENS # Optional default as the deployer address.
```

### ERC20 Token

You can find the token contract code here: [ERC20Comp.sol](contracts/Compound/ERC20Comp.sol)

```bash
npx hardhat comp_token \
    --name TOKEN_NAME \
    --symbol TKN \
    --owner 0x_ADDRESS_OF_OWNER_OF_TOTAL_TOKENS #Optional, default value is the deployer address
```
### Timelock contract deployment

You can find the timelock contract code here: [TimeLock.sol](contracts/Compound/Timelock.sol)

```bash
npx hardhat comp_timelock \
    --delay time_in_seconds_between_172800_2592000
```

You should deploy the governance contract right after deploying the Timelock one.

### Alpha Governance

You can find the dao contract code here: [AlphaGovernor.sol](contracts/Compound/AlphaGovernor.sol)

```bash
npx hardhat alpha_governance \
    --name DAO_NAME \
    --timelock 0x_ADDRESS_OF_TIMELOCK_CONTRACT \
    --token 0x_ADDRESS_OF_TOKEN_CONTRACT \
    --guardian 0x_ADDRESS_OF_OWNER_OF_TOTAL_TOKENS # Optional default as the deployer.
```

### Bravo Governance (Delegate)

You can find the dao contract code here: [BravoGovernor.sol](contracts/Compound/BravoGovernor.sol)

```bash
npx hardhat bravo_governance \
    --name DAO_NAME
```

### Bravo Delegator

When the bravo delegator is deployed the governance is initialized. This is the last contract you deploy in the Bravo schema.

```bash
npx hardhat bravo_delegator \
    --timelock 0x_ADDRESS_OF_TIMELOCK_CONTRACT \
    --token 0x_ADDRESS_OF_TOKEN_CONTRACT \
    --admin 0x_ADDRESS_OF_ADMIN \ # Optional
    --governance 0xADDRESS_OF_BRAVO_GOVERNOR_CONTRACT \
    --delay time_in_seconds \ # optional
    --threshold time_in_seconds \ #optional
    --period time_in_seconds \ #optional
```

## OpenZepellin

## Nouns, NFTDao

![Example printscreen](resources/print_screen_example.png)

<!-- 
## OpenZepellin DAO 

### with ERC20 Token

### with ERCO Wrapped Token

### with ERC721 Votes

## Compound Alpha

### with ERC20 Token

### with Wrapped Token

## Compound Bravo

### with ERC20 Token

### with Wrapped Token

If possible:
------------
## Compound Alpha with ERC721 Votes

## Compound Bravo with ERC721 Votes 


# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
npx hardhat run --network <your-network> scripts/token-deployer.js --parameter1 one --parameter2 two --parameter3 three
npx hardhat verify --network goerli 0x8b91856Fe8B29493e615fBCA81B94B61DFcc670C 'Hello, Hardhat!'

```
-->
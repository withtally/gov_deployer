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

Here you can see what are the commands to call to deploy and get the scenario you want.

In the commands you're going to read bellow notice that everythin in [] is optional and will have a default value.

The network name based in `--network` option, have to follow the network name in the _`hardhat.config.js`_ file.

First of all run both of this.
```bash
npx hardhat compile
npx hardhat node
```

## ERC20 Token based on compound deployment

You can find the token code here: [TokenBasedOnComp.sol](contracts/Compound/TokenBasedOnComp.sol)

```bash
node scripts/token-comp-deployer.js \
    -t TOKEN_NAME \ # token name
    -s TKN \ # token symbol
    [ -o 0x_ADDRESS_OF_OWNER_OF_TOTAL_TOKENS ]default:deployer \  # OPTIONAL default deployer address 
    [ --network low_case_name ]default:localhost # OPTIONAL default: localhost 
```
## Timelock contract deployment

You can find the timelock code here: [TimeLock.sol](contracts/Compound/Timelock.sol)

```bash
node scripts/timelock-deployer.js \
    -t time_in_seconds_between_172800_2592000 \ # time delay
    -o 0xADDRESS_OF_ADMIN  \ # OPTIONAL default deployer address 
    --network low_case_name # OPTIONAL default: localhost 
```

## DAO contract based on compound alpha deployment

You can find the timelock code here: [GovAlphaBased.sol](contracts/Compound/GovAlphaBased.sol)

```bash
node scripts/alpha-gov-deployer.js \
    -n DAO_NAME \ # dao name
    -t 0x_ADDRESS_OF_TIMELOCK_CONTRACT \ # time lock contract address
    -c 0x_ADDRESS_OF_TOKEN_CONTRACT \ # token erc20 with votes contract address
    -o 0x_ADDRESS_OF_OWNER_OF_TOTAL_TOKENS \ # OPTIONAL default deployer address 
    --network low_case_name  # OPTIONAL default: localhost 
```

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
```
-->
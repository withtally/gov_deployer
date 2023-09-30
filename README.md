![Theme image for repository](resources/banner.png)
DAO Contracts Deployer
======================
A tool to deploy governance and related contracts supported by Tally via CLI. 

All the contracts disclosed here are opinionated versions of it and you can always redesign and modify if they stick to the overall pattern.

----------------
# Gov Deployer
## About

Gov deployer is dev tool created by developers in tally, in special [Arthur](github.com/afa7789).
Its main purpose is to deploy the contracts that tally support in their products with a single line of command.

To skip reading too much and go directly to the commands [click here](#deployments) and to go to the [table of content click here](#table-of-content).

### Which Governance should I use ?

Are you still unsure on what governance to use, let's us help you!

The more usual governances are Alpha and Bravo, from the compound governance, we could say that they created the initial pattern and following it we have OpenZeppelin governance contract. Tally recommends you to use Openzeppelin contract, because it will be the one with more support and less chance of being deprecated, and it is too the contracts with more longevity, maintenance and support as well as have more functionalities and features in Tally. 

Look up this comparison chart below, to see which one is the best for you.

| α Governor Alpha                                                          	| β Governor Bravo                                                        	| ℥ Governor OpenZeppelin                                                 	|
|---------------------------------------------------------------------------	|-------------------------------------------------------------------------	|-------------------------------------------------------------------------	|
| 🛑 Non-upgradable contract.                                                	| 🛠️ Built in upgradability.                                               	| 🧰 Built in upgradability and more customization.                        	|
| 🔀 Parameter changes require contract migration.                           	| 🔁 Parameter changes uses static contract address, no migrations needed. 	| 🔁 Parameter changes uses static contract address, no migrations needed. 	|
| ☑️ Yes and No vote options.                                                	| 🗳️ Yes, no and abstain vote options.                                     	| 🗳️ Yes, no and abstain vote options.                                     	|
| ❓ No additional context recorded with vote.                               	| 📝 option to add text comment to on-chain vote.                          	| 📝 option to add text comment to on-chain vote.                          	|
| ♻️ Each upgrade resets proposal number schema                              	| 📈 Continuous proposal numbers regardless of upgrades                    	| 📈 Continuous proposal numbers regardless of upgrades                    	|
| 📍 Supported, was the first governance version. Easier deploy system.  	| 🔩 Supported too since it is an upgrade to the Alpha version.         	| 🔮 Widely Supported, as a contract from open zeppelin. With more features and upgrades.                   	|
| ❌ Does not support off-chain proposal signatures.                         	| ❌ Does not support off-chain proposal signatures.                       	| ⛓️ Supports Off-chain proposal signatures.                               	|

With this deployer you will be able to see how to build tasks to deploy governances, and deploy Open Zepellins contracts.

### Table of content

- [Gov Deployer](#gov-deployer)
  - [About](#about)
    - [Which Governance should I use ?](#which-governance-should-i-use)
    - [Table of Content](#table-of-content)
    - [Pre-Requisites](#pre-requisites)
    - [Installation](#installation)
- [Deployments](#deployments)
  - [OpenZepellin](#openzepellin)
  - [Compound](#compound)
    - [Alpha Deployment](#alpha-deployment)
      - [ERC20 Token](#erc20-token)
      - [Timelock contract deployment](#timelock-contract-deployment)
      - [Alpha Governance](#alpha-governance)
    - [Bravo Deployment](#bravo-deployment)
      - [Bravo Governance (Delegate)](#bravo-governance-delegate)
      - [Bravo Delegator](#bravo-delegator)
  <!-- - [Nouns, NFTDao](#nouns-nftdao) -->
- [Networks that Tally support](#networks-that-tally-support)
      - [Ethereum](#ethereum)
      - [Polygon](#polygon)
      - [Avalanche](#avalanche)
      - [Optimism](#optimism)
      - [Arbitrum](#arbitrum)
      - [Localhost](#localhost)

### Pre-Requisites

- Npm and Node.
- Git.

### Installation

```bash
git clone https://github.com/afa7789/gov_deployer.git && cd gov_deployer
yarn install
# copy and replace values on .env
cp .env.example .env
# you will need to get node rpcs to make it work, probably public rpc are enough, since it's just deployment.
```

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


## OpenZepellin
⚠️⚠️ __WORKING ON IT__ ⚠️⚠️

### OZ GOV Deployment from ZERO

```bash
    npx hardhat oz_dao \
        --name "Dave DAO" \
        --token "DAVE TT" \
        --symbol "DTT" \
        --delay 172800
        --network goerli
```

with optional parameters:

```bash
    npx hardhat oz_dao \
        --name "Dave DAO" \
        --token "DAVE TT" \
        --symbol "DTT" \
        --delay 172800 \
        --executors 0x123_ADRESS_1...,0x123_ADRESS_2... \ # if single address just add 1 without comma
        --proposers 0x123_ADRESS_1...,0x123_ADRESS_2... \ # executors and proposers are optional the deployer is always added to it.
        --vdelay NUMBER_OF_BLOCKS_AFTER_CREATING_PROPOSAL_YOU_CAN_VOTE \
        --period PERIOD_YOU_CAN_VOTE \
        --fraction QUORUM_FRACTION_LESS_THAN_100_NUMERATOR \
        --threshold MINIMUM_TOKEN_TO_PROPOSE
    # default values:
    # vdelay is 100 blocks
    # period is 45818 blocks
    # fraction is 60
    # threshold is 100 ( I recommend putting a threshold in accord to your business)
```

Deploy the following contracts:
#### ERC20 Token Votes and Mintable

You can find the token contract code here: [ERC20Comp.sol](contracts/OpenZepellin/TokenVotesMintable.sol)

```bash
npx hardhat votes_token \
    --name TOKEN_NAME \
    --symbol TKN \
    --owner 0x_ADDRESS_OF_OWNER_OF_TOTAL_TOKENS #Optional, default value is the deployer address
# you will have to mint tokens, this is not decided by Tally how you should deal with it, due to legal reasons.

# you will need to mint the tokens as owner
# after minted and distributed you can set the owner of the contract as the Governance.
```
#### Timelock contract deployment

You can find the timelock contract code here: [TimelockControllerOZ.sol](contracts/OpenZepellin/TimelockControllerOZ.sol)

```bash
npx hardhat oz_timelock \
    --delay time_in_seconds_172800 #48 hours
    --executors 0x123_ADRESS_1...,0x123_ADRESS_2...
    --proposers 0x123_ADRESS_1...,0x123_ADRESS_2...
    # if single address just add 1 without comma
    # executors and proposers are optional the deployer is always added to it.
```

#### Governance contract deployment

You can find the timelock contract code here: [OZGovernor.sol](contracts/OpenZepellin/OZGovernor.sol)

```bash
npx hardhat oz_governance \
    --name DAO_NAME \
    --token 0x123_ADRESS_1_token \
    --timelock 0x123_ADRESS_2_timelock
```

with optional parameters:

```bash
#everything after timelock is optional
npx hardhat oz_governance \
    --name DAO_NAME \
    --token 0x123_ADRESS_1_token \
    --timelock 0x123_ADRESS_2_timelock \
    --delay NUMBER_OF_BLOCKS_AFTER_CREATING_PROPOSAL_YOU_CAN_VOTE \
    --period PERIOD_YOU_CAN_VOTE \
    --fraction QUORUM_FRACTION_LESS_THAN_100_NUMERATOR \
    --threshold MINIMUM_TOKEN_TO_PROPOSE
# default values:
# delay is 100 blocks
# period is 45818 blocks
# fraction is 60
# threshold is 100 ( I recommend putting a threshold in accord to your business)
```

---------------------------------

## Compound
⚠️⚠️ __GIVE PRIORITY TO OZ STYLE__ ⚠️⚠️

The following section contains the scripts which will deploy the Compound Alpha version of the governance contracts.

Compound is DAO that created two patterns of Governance contracts Alpha and Bravo.

The compound contracts were tinkered with the proposal of allowing us to set their names and symbols during deployment time. So if you need to change some of the variables it's recommended to change in contract and run `npx hardhat compile` to update the contract.

### Alpha Deployment

Deploy in one go all the contracts to create an Alpha Compound style governance.

The contracts are deployed in the following order __1st the token__, __2nd the timelock__, __3rd the governance__. 

```bash
npx hardhat alpha_dao \
    --name DAO_NAME \
    --token TOKEN_NAME \
    --symbol TKN \
    --delay time_in_seconds_between_172800_2592000
    --owner 0x_ADDRESS_OF_OWNER_OF_TOTAL_TOKENS #Optional, default value is the deployer address
    --guardian 0x_ADDRESS_OF_OWNER_OF_TOTAL_TOKENS # Optional default as the deployer address.
```

#### ERC20 Token

You can find the token contract code here: [ERC20Comp.sol](contracts/Compound/ERC20Comp.sol)

```bash
npx hardhat comp_token \
    --name TOKEN_NAME \
    --symbol TKN \
    --owner 0x_ADDRESS_OF_OWNER_OF_TOTAL_TOKENS #Optional, default value is the deployer address
```
#### Timelock contract deployment

You can find the timelock contract code here: [TimeLock.sol](contracts/Compound/Timelock.sol)

```bash
npx hardhat comp_timelock \
    --delay time_in_seconds_between_172800_2592000
```

You should deploy the governance contract right after deploying the Timelock one.

#### Alpha Governance

You can find the dao contract code here: [AlphaGovernor.sol](contracts/Compound/AlphaGovernor.sol)

```bash
npx hardhat alpha_governance \
    --name DAO_NAME \
    --timelock 0x_ADDRESS_OF_TIMELOCK_CONTRACT \
    --token 0x_ADDRESS_OF_TOKEN_CONTRACT \
    --guardian 0x_ADDRESS_OF_OWNER_OF_TOTAL_TOKENS # Optional default as the deployer.
```
------------------------------------
### Bravo Deployment

Deploy in a single command all the contracts needed to create a Bravo Compound style governance.

To deploy bravo you need to deploy __1st the token__, __2nd the timelock__, __3rd the delegate__ and __4th delegator__. Delegator is the main governance contract and delegate is the governance contract used as a proxy to the delegator.


```bash
npx hardhat bravo_dao \
    --name DAO_NAME \
    --token TOKEN_NAME \
    --symbol TKN \
    --delay time_in_seconds_between_172800_2592000
    --owner 0x_ADDRESS_OF_OWNER_OF_TOTAL_TOKENS #Optional, default value is the deployer address
    --guardian 0x_ADDRESS_OF_OWNER_OF_TOTAL_TOKENS # Optional default as the deployer address.
```

#### Bravo Governance 

Bravo governance delegator is the main contract which points to the other contracts and should be the admin of the timelock.

Bravo governance delegate is the logic for the governance contract. It is used by delegator with the proxy approach. This can be redeployed when they want to upgrade the governance.
##### Delegate

You can find the dao contract code here: [BravoGovernorDelegate.sol](contracts/Compound/BravoGovernorDelegate.sol)

The delegate contract is changed to not block Bravo DAO's which does not have a previous Alpha.

```bash
npx hardhat bravo_delegate \
    --name DAO_NAME
```

##### Delegator

When the bravo delegator is deployed the governance is initialized. This is the last contract you deploy in the Bravo schema. You can find the dao contract code here: [GovernorBravoDelegator.sol](contracts/Compound/GovernorBravoDelegator.sol)

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
------------------------------------

__Future planning:__
- Add a plugin usage to add it to the Tally website.

----------------------

This repository is incomplete as I'm still ⚠️⚠️ __WORKING ON IT__ ⚠️⚠️. If you have any suggestions or tips in improving it please mail me: arthur@withtally.com or call in my [git](github.com/afa7789).

![Example printscreen](resources/print_screen_example.png)


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
- Optimism Goerli - * missing etherscan explorer *

#### Arbitrum
- Arbitrum One - https://arbiscan.io/
- Arbitrum Rinkeby - https://testnet.arbiscan.io/

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

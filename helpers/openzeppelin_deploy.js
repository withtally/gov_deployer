
/**
 * erc20  will deploy the ERC20 token contract from openzeppelin and it's the defacto most standard version.
 * You have to pass a totalSupply otherwise there won't exist a single token in this contract.
 * It will be used in this repository to teach how to use a token and wrap it for governances.
 * 
 * @param {*} token_name  , token name is the whole name of the coin. e.g: Ethers
 * @param {*} token_symbol , token symbol is the symbol of the coin. e.g: ETH
 * @param {*} token_decimals , token decimals is the number of decimals of the coin. e.g: 18
 * @param {*} token_totalSupply , total supply of the coin, e.g: 100000000000000000000
 * @param {*} token_owner , token owner is the acccount who will hold all the tokens at the deployment
 * @param {*} signer , ethereum address who will sign
 * @returns 
 */
const erc20 = async (
    token_name,
    token_symbol,
    token_decimals,
    token_totalSupply,
    token_owner,
    signer
) => {
    // We get the contract to deploy
    const TokenERC20 = await hre.ethers.getContractFactory("TokenERC20");

    //constructor( string memory _name, string memory _symbol, uint8 _decimals, uint256 _totalSupply, address _owner)
    const token = await TokenERC20.connect(signer).deploy(
        token_name,
        token_symbol,
        token_decimals,
        token_totalSupply,
        token_owner
    );

    // await deploy and get block number
    await token.deployed();
    return token
}

/**
 * erc20Votes  will deploy the ERC20 token contract from openzeppelin with votes and mintable packages.
 * You have to pass the ownership to the DAO contract.
 * 
 * @param {*} token_name  , token name is the whole name of the coin. e.g: Ethers
 * @param {*} token_symbol , token symbol is the symbol of the coin. e.g: ETH
 * @param {*} signer , ethereum address who will sign
 * @returns 
 */
const erc20Votes = async (
    token_name,
    token_symbol,
    signer
) => {
    // We get the contract to deploy
    const TokenERC20Votes = await hre.ethers.getContractFactory("TokenERC20VotesMintable");

    //constructor(string memory _name, string memory _symbol)
    const token = await TokenERC20Votes.connect(signer).deploy(
        token_name,
        token_symbol,
    );

    // await deploy and get block number
    await token.deployed();
    return token
}

/**
 * erc721votes will deploy the ERC721 token contract (NFT) from openzeppelin.
 * 
 * @param {*} token_name  , token name is the whole name of the coin. e.g: Ethers
 * @param {*} token_symbol , token symbol is the symbol of the coin. e.g: ETH
 * @param {*} signer , ethereum address who will sign
 * @returns 
 */
const erc721votes = async (
    token_name,
    token_symbol,
    signer
) => {
    // We get the contract to deploy
    const TokenERC721Votes = await hre.ethers.getContractFactory("TokenERC721Votes");

    // constructor(string memory _name, string memory _symbol)
    const token = await TokenERC721Votes.connect(signer).deploy(
        token_name,
        token_symbol,
    );

    // await deploy and get block number
    await token.deployed();
    return token
}

/**
 * erc20Wrapper will deploy a contract that wraps other token to be used as voting mechanism to a DAO.
 * 
 * @param {*} token_address , token address is the 0x address of the previous token contract.
 * @param {*} token_name , token name is the whole name of the coin. e.g: Ethers
 * @param {*} token_symbol , token symbol is the symbol of the coin. e.g: ETH
 * @param {*} signer , ethereum address who will sign.
 * @returns 
 */
const erc20Wrapper = async (
    token_address,
    token_name,
    token_symbol,
    signer
) => {
    // We get the contract to deploy
    const WrappedTokenVotes = await hre.ethers.getContractFactory("WrappedTokenVotes");

    //constructor( IERC20 wrappedToken, string memory _name, string memory _symbol )
    const token = await WrappedTokenVotes.connect(signer).deploy(
        token_address,
        token_name,
        token_symbol,
    );

    // await deploy and get block number
    await token.deployed();
    return token
}

/**
 * ozGovernor  will deploy a governor contract in the standard proposed by OpenZeppelin.
 * 
 * @param {*} token_address , token address is the 0x address of the previous token contract.
 * @param {*} timelock_address , timelock address is the 0x address of the timelock controller contract.
 * @param {*} dao_name , the DAO governance name
 * @param {*} block_ammount 
 * @param {*} block_period 
 * @param {*} quorum_fraction 
 * @param {*} proposal_threshold 
 * @param {*} signer  , ethereum address who will sign.
 * @returns 
 */
const ozGovernor = async (
    token_address,
    timelock_address,
    dao_name,
    block_ammount,
    block_period,
    quorum_fraction,
    proposal_threshold,
    signer
)=>{
    // We get the contract to deploy
    const OZGovernor = await hre.ethers.getContractFactory("OZGovernor");

    // constructor( IVotes _token, TimelockController _timelock, string memory _name, 
    //uint16 _block_ammount, uint32 _block_period, uint16 _quorum_fraction, uint32 _proposal_threshold )
    const gov = await OZGovernor.connect(signer).deploy(
        token_address,
        timelock_address,
        dao_name,
        block_ammount,
        block_period,
        quorum_fraction,
        proposal_threshold,
    );

    // await deploy and get block number
    await gov.deployed();
    return gov
}

/**
 * timelockController  will deploy the Timelock Controller contract from openzeppelin.
 * 
 * @param {*} minDelay 
 * @param {*} proposers 
 * @param {*} executors 
 * @param {*} signer 
 * @returns 
 */
 const timelockController = async (
    minDelay,
    proposers,
    executors,
    signer
) => {
    // We get the contract to deploy
    const TimelockControllerOZ = await hre.ethers.getContractFactory("TimelockControllerOZ");

    //constructor( uint256 minDelay, address[] memory proposers, address[] memory executors)
    const timelock = await TimelockControllerOZ.connect(signer).deploy(
        minDelay,
        proposers,
        executors
    );

    // await deploy and get block number
    await timelock.deployed();
    return timelock
}

module.exports = {
    erc20,
    erc20Votes,
    erc721votes,
    erc20Wrapper,
    ozGovernor,
    timelockController
}
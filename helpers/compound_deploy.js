
/**
 * erc20comp will deploy a token with parameters passed in.
 * and it is using a contract you can find in ./contracts/compound
 * 
 * @param {*} token_owner , token owner is the acccount who will hold all the tokens at the deployment
 * @param {*} token_name  , token name is the whole name of the coin. e.g: Ethers
 * @param {*} token_symbol , token symbol is the symbol of the coin. e.g: ETH
 * @param {*} signer , ethereum address who will sign
 * @returns 
 */
const erc20comp = async (
    token_owner,
    token_name,
    token_symbol,
    signer
) =>{
    // We get the contract to deploy
    const ERC20Comp = await hre.ethers.getContractFactory("ERC20Comp");

    // constructor(address account, string memory _name, string memory _symbol)
    const token = await ERC20Comp.connect(signer).deploy(
        token_owner,
        token_name,
        token_symbol,
    );

    // await deploy and get block number
    await token.deployed();
    return token
}

/**
 * timelock will deploy a timelock with parameters passed in.
 * and it is using a contract you can find in ./contracts/compound
 * 
 * @param {*} admin_address , admin address is the address who will hold admin role in the timelock
 * @param {*} timelock_delay , timelock_delay
 * @param {*} signer , ethereum address who will sign
 * @returns 
 */
const timelock = async (
    admin_address,
    timelock_delay,
    signer
) => {
    // We get the contract to deploy
    const Timelock = await hre.ethers.getContractFactory("Timelock");

    // constructor(address admin_, uint delay_) public 
    const time = await Timelock.connect(signer).deploy(
        admin_address,
        timelock_delay
    );

    // await deploy and get block number
    await time.deployed();
    return time;
}

/**
 * alphaGov will deploy a timelock with parameters passed in.
 * and it is using a contract you can find in ./contracts/compound
 * 
 * @param {*} timelock_address , timelock address
 * @param {*} token_address , token contract address
 * @param {*} guardian_address , address of the holder of guardian role
 * @param {*} dao_name , the DAO governance name
 * @param {*} signer , ethereum address who will sign
 * @returns 
 */
const alphaGov = async (
    timelock_address,
    token_address,
    guardian_address,
    dao_name,
    signer
) => {
    // We get the contract to deploy
    const GovernorAlpha = await hre.ethers.getContractFactory("AlphaGovComp");

    // constructor(address timelock_, address token_, address guardian_, string memory _name) public
    const gov = await GovernorAlpha.connect(signer).deploy(
        timelock_address,
        token_address,
        guardian_address,
        dao_name
    );

    // await deploy and get block number
    await gov.deployed();
    return gov;
}

/**
 * bravoGov will deploy a timelock with parameters passed in.
 * and it is using a contract you can find in ./contracts/compound
 * 
 * @param {*} timelock_address , timelock address
 * @param {*} token_address , token contract address
 * @param {*} guardian_address , address of the holder of guardian role
 * @param {*} dao_name , the DAO governance name
 * @param {*} signer , ethereum address who will sign
 * @returns 
 */
 const bravoGov = async (
    timelock_address,
    token_address,
    guardian_address,
    dao_name,
    signer
) => {
    // We get the contract to deploy
    const GovernorBravo = await hre.ethers.getContractFactory("AlphaGovComp");

    // constructor(address timelock_, address token_, address guardian_, string memory _name) public
    const gov = await GovernorBravo.connect(signer).deploy(
        timelock_address,
        token_address,
        guardian_address,
        dao_name
    );

    // await deploy and get block number
    await gov.deployed();
    return gov;
}

module.exports = {
    erc20comp,
    timelock,
    alphaGov,
    bravoGov
}
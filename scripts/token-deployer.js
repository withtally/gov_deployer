const hre = require("hardhat");
const yargs = require("yargs");

let argv = yargs.usage('$0 -t [token-name] -s [token-symbol] -o [token-owner]')
    .help()
    .example(
        '$0 -t Compound -s Comp \n-o 0xabc123...42digits...pub.key',
        'Deploys a contract with the given token name, symbol, and owner ( owner if not passed will be the deployer address.'
    )
    .demandOption(['t','s'])
    .alias('t', 'token-name')
    .alias('s', 'token-symbol')
    .alias('o', 'token-owner')
    .argv

async function main(argv) {
    console.log("Token deployer will use hardhat.ethers to deploy the token.")
    // console.log('argv:', argv)
    // getting the network data
    // network =  argv.network ? argv.network : 'localhost'

    // const provider_url = hre.config['networks'][network].url
    // // create provider from rpc url
    // const provider = new hre.ethers.providers.JsonRpcProvider(provider_url);
    // const signer = new hre.ethers.Wallet(hre.config.private_key, provider);
    const signer = new hre.ethers.Wallet(hre.config.private_key);

    // token data
    const token_name = argv.tokenName;
    const token_symbol = argv.tokenSymbol;
    const token_owner = argv.tokenOwner ? argv.tokenOwner : signer.address;

    // console.log("network:\x1B[32m", network, "\x1B[37m, provider connection:", provider.connection);
    console.log("token_name:\x1B[36m", token_name,"\x1B[37m");
    console.log("token_symbol:\x1B[36m", token_symbol,"\x1B[37m");
    console.log("token_owner:\x1B[33m", token_owner,"\x1B[37m\n");
    
    // We get the contract to deploy
    const TokenBasedOnComp = await hre.ethers.getContractFactory("TokenBasedOnComp");
    const token = await TokenBasedOnComp.deploy(token_name, token_symbol, token_owner);

    await token.deployed();

    console.log(`Token ${token_symbol} deployed to:`, greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main(argv)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

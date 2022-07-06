// TODO Transform this in a TASK
const { Signer } = require("ethers");
const hre = require("hardhat");
const yargs = require("yargs");

let argv = yargs.usage('$0 -t [token-name] -s [token-symbol] -o [token-owner]')
    .help()
    .example(
        '$0 -t Compound -s Comp',
        'Deploys a contract with the given token name, symbol, and owner ( owner if not passed will be the deployer address.'
    )
    .demandOption(['t','s'])
    .alias('t', 'token-name')
    .alias('s', 'token-symbol')
    .string('t').string('s').string('o')
    .argv

async function main(argv) {
    console.log("Token deployer will use hardhat.ethers to deploy the token.")
    network = argv.network ? argv.network : 'localhost'

    const provider_url = hre.config['networks'][network].url
    // create provider from rpc url
    const provider = new hre.ethers.providers.JsonRpcProvider(provider_url);
    const signer = new hre.ethers.Wallet(hre.config.private_key, provider);

    // token data
    const token_name = argv.tokenName;
    const token_symbol = argv.tokenSymbol;
    const token_owner = argv.tokenOwner ? argv.tokenOwner : signer.address;

    // INFO LOGS
    console.log("network:\x1B[32m", network, "\x1B[37m, provider connection:", provider.connection);
    console.log("token_name:\x1B[36m", token_name,"\x1B[37m");
    console.log("token_symbol:\x1B[36m", token_symbol,"\x1B[37m");
    console.log("token_owner:\x1B[33m", token_owner,"\x1B[37m\n");  

    // We get the contract to deploy
    const TokenBasedOnComp = await hre.ethers.getContractFactory("TokenBasedOnComp");

    // constructor(address account, string memory _name, string memory _symbol)
    const token = await TokenBasedOnComp.connect(signer).deploy(
        token_owner,
        token_name, 
        token_symbol, 
    );

    await token.deployed();
    const lb = await provider.getBlock("latest")

    console.log(`Token \x1B[36m${token_symbol}\x1B[37m deployed to:\x1B[33m`, token.address,"\x1B[37m");
    console.log(`Creation block number:\x1B[35m"`,lb.number,"\x1B[37m");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main(argv)
    .then(() => process.exit(0))
    .catch((error) => {
        if(error.error?.data.length)
            console.error(error.code,error.error?.data);
        else
            console.log(error);
        process.exit(1);
    });

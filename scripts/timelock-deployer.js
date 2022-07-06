// TODO Transform this in a TASK
const hre = require("hardhat");
const yargs = require("yargs");

let argv = yargs.usage('$0 -n [dao-name] -c [token-address] -t [timelook-address] -o [guardian-owner]')
    .help()
    .example(
        '$0 -n Compound DAO -c 0xabc123...token.address -t 0xabc123.timelock.address  \n-o 0xabc123...42digits...pub.key',
        'Deploys a timelock contract with the given delay and admin ( admin if not passed will be the deployer address.)'
    )
    .demandOption(['t','o'])
    .alias('t', 'timelock-delay')
    .alias('o', 'admin-address')
    .argv

async function main(argv) {
    console.log("Timelock deployer will use ethers.js to deploy the timelock contract.")
    network = argv.network ? argv.network : 'localhost'

    const provider_url = hre.config['networks'][network].url
    // create provider from rpc url
    const provider = new hre.ethers.providers.JsonRpcProvider(provider_url);
    const signer = new hre.ethers.Wallet(hre.config.private_key, provider);

    // dao data
    const timelock_delay = argv.timelockDelay;
    const admin_address = argv.adminAddress ? argv.adminAddress : signer.address;

    // INFO LOGS
    console.log("network:\x1B[32m", network, "\x1B[37m, provider connection:", provider.connection);
    console.log("timelock delay:\x1B[35m", timelock_delay, "\x1B[37m");
    console.log("admin address:\x1B[33m", admin_address,"\x1B[37m\n");


    // We get the contract to deploy
    const Timelock = await hre.ethers.getContractFactory("Timelock");

    // constructor(address admin_, uint delay_) public 
    const time = await Timelock.connect(signer).deploy(
        admin_address,
        timelock_delay
    );

    await time.deployed();

    console.log(`Timelock deployed to:\x1B[33m`, time.address,"\x1B[37m");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main(argv)
    .then(() => process.exit(0))
    .catch((error) => {

        console.error(error.code,error.error.data);
        process.exit(1);
    });
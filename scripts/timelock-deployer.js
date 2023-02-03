// Use the task in favor of this.
// leaving it for future reference.

const hre = require("hardhat");
const yargs = require("yargs");
const fs = require('fs');
const getExpectedContractAddress = require('helpers/expected_contract.js');

let argv = yargs.usage('$0 -t [timelock-delay]')
    .help()
    .example(
        '$0 -t time_in_seconds_between_172800_2592000 ',
        'Deploys a timelock contract with the given delay and admin ( admin if not passed will be the deployer address.)'
    )
    .demandOption(['t'])
    .alias('t', 'timelock-delay')
    .string('t')
    .argv

async function main(argv) {
    console.log("Timelock deployer will use ethers.js to deploy the timelock contract.")
    network = argv.network ? argv.network : 'localhost'

    const provider_url = hre.config['networks'][network].url
    const private_key = hre.config['networks'][network].accounts[0]

    // create provider from rpc url
    const provider = new hre.ethers.providers.JsonRpcProvider(provider_url);
    const signer = new hre.ethers.Wallet(private_key, provider);

    // dao data
    const timelock_delay = argv.timelockDelay;
    const admin_address = await getExpectedContractAddress(signer,2);

    // INFO LOGS
    console.log("network:\x1B[32m", network, "\x1B[37m, provider connection:", provider.connection);
    console.log("admin address:\x1B[33m", admin_address, "\x1B[37m\n");
    console.log("timelock delay:\x1B[35m", timelock_delay, "\x1B[37m");

    // We get the contract to deploy
    const Timelock = await hre.ethers.getContractFactory("Timelock");

    // constructor(address admin_, uint delay_) public 
    const time = await Timelock.connect(signer).deploy(
        admin_address,
        timelock_delay
    );

    // await deploy and get block number
    await time.deployed();
    const lb = await provider.getBlock("latest")
    
    // DEPLOYMENT LOGS
    console.log(`Timelock deployed to:\x1B[33m`, time.address, "\x1B[37m");
    console.log(`Creation block number:\x1B[35m`, lb.number, "\x1B[37m");
    console.log(`Deploy your DAO now, to use the expected admin in the timelock contract.`)

    // verify cli command
    const verify_str = `npx hardhat verify ` +
        `--network ${network.name} ` +
        `${time.address} ` +
        `"${admin_address}" "${timelock_delay}"`

    console.log("\n"+verify_str)

    // save it to a file to make sure the user doesn't lose it.
    fs.appendFileSync('contracts.out', `${new Date()}\nTimelock contract deployed at: ${time.address}  - ${hre.network.name} - block number:${lb.number}\n${verify_str}\n\n`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main(argv)
    .then(() => process.exit(0))
    .catch((error) => {
        if (error.error?.data.length)
            console.error(error.code, error.error?.data);
        else
            console.log(error);
        process.exit(1);
    });

// Use tasks in favor of this.
// leaving it for future reference.

const hre = require("hardhat");
const yargs = require("yargs");
const fs = require('fs');

let argv = yargs.usage('$0 -n [dao-name] -c [token-address] -t [timelook-address] -o [guardian-owner]')
    .help()
    .example(
        '$0 -n Compound DAO -c 0xabc123...token.address -t 0xabc123.timelock.address  \n-o 0xabc123...42digits...pub.key',
        'Deploys a DAO contract with the given dao name, token address ,timelock address and guardian ( guardian if not passed will be the deployer address.)'
    )
    .demandOption(['t', 'c', 'n'])
    .alias('n', 'dao-name')
    .alias('c', 'token-address')
    .alias('t', 'timelock-address')
    .alias('o', 'guardian-address')
    .string('c').string('t').string('n').string('o')
    .argv

async function main(argv) {
    console.log("Alpha Compound deployer will use hardhat.ethers to deploy the Compound DAO pattern, governance contract.")
    network = argv.network ? argv.network : 'localhost'
    const provider_url = hre.config['networks'][network].url
    const private_key = hre.config['networks'][network].accounts[0]

    // create provider from rpc url
    const provider = new hre.ethers.providers.JsonRpcProvider(provider_url);
    const signer = new hre.ethers.Wallet(private_key, provider);

    // dao data
    const dao_name = argv.daoName;
    const token_address = argv.tokenAddress;
    const timelock_address = argv.timelockAddress;
    const guardian_address = argv.guardianAddress ? argv.guardianAddress : signer.address;

    // INFO LOGS
    console.log("network:\x1B[32m", network, "\x1B[37m, provider connection:", provider.connection);
    console.log("timelock_address:\x1B[33m", timelock_address, "\x1B[37m\n");
    console.log("token_address:\x1B[33m", token_address, "\x1B[37m");
    console.log("guardian_address:\x1B[33m", guardian_address, "\x1B[37m");
    console.log("dao_name:\x1B[36m", dao_name, "\x1B[37m\n");

    // We get the contract to deploy
    const GovernorAlpha = await hre.ethers.getContractFactory("AlphaGovernor");

    // constructor(address timelock_, address token_, address guardian_, string memory _name) public
    const gov = await GovernorAlpha.connect(signer).deploy(
        timelock_address,
        token_address,
        guardian_address,
        dao_name
    );

    // await deploy and get block number
    await gov.deployed();
    const lb = await provider.getBlock("latest")

    // DEPLOYMENT LOGS
    console.log(`Dao: \x1B[36m${dao_name}\x1B[37m deployed to:\x1B[33m`, gov.address, "\x1B[37m");
    console.log(`Creation block number:\x1B[35m"`, lb.number, "\x1B[37m");

    // verify cli
    const verify_str = `npx hardhat verify ` +
        `--network ${network} ` +
        `${gov.address} ` +
        `"${timelock_address}" "${token_address}" "${guardian_address}" "${dao_name}"`

    console.log("\n"+verify_str)

    // save it to a file to make sure the user doesn't lose it.
    fs.appendFileSync('contracts.out', `Governance contract deployed at: ${gov.address}\n${verify_str}\n\n`);

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

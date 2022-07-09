const { alphaGov } = require('../../helpers/compound_deploy');
const fs = require('fs');

task('alpha_governance', "Deploys a Alpha governance contract. Deploy after timelock.")
    .addParam("name", "The name of the DAO.")
    .addParam("token", "The delay time in seconds between 172800 and 2592000.")
    .addParam("timelock", "The address of the timelock contract.")
    .addOptionalParam("guardian", "The guardian address. If not passed, the deployer address will be used.")
    .setAction(async (taskArgs, hre) => {
        console.log("Deploying a Compound Alpha Governance contract");

        const signer = await hre.ethers.getSigner()

        // HARDHAT LOG
        console.log(
            `network:\x1B[36m${hre.network.name}\x1B[37m\n`,
            `signer:\x1B[33m${signer.address}\x1B[37m\n`
        );

        // DAO DATA
        const dao_name = taskArgs.name;
        const token_address = taskArgs.token;
        const timelock_address = taskArgs.timelock;
        const guardian_address = taskArgs.guardian ? taskArgs.guardian : signer.address;

        // INFO LOGS
        console.log("timelock_address:\x1B[33m", timelock_address, "\x1B[37m\n");
        console.log("token_address:\x1B[33m", token_address, "\x1B[37m");
        console.log("guardian_address:\x1B[33m", guardian_address, "\x1B[37m");
        console.log("dao_name:\x1B[36m", dao_name, "\x1B[37m\n");

        //  DEPLOY ALPHA GOVERNANCE
        const gov = await alphaGov(
            timelock_address,
            token_address,
            guardian_address,
            dao_name,
            signer
        );

        const lb = await provider.getBlock("latest")

        // DEPLOYMENT LOGS
        console.log(`Dao: \x1B[36m${dao_name}\x1B[37m deployed to:\x1B[33m`, gov.address, "\x1B[37m");
        console.log(`Creation block number:\x1B[35m"`, lb.number, "\x1B[37m");

        // verify cli
        const verify_str = `npx hardhat verify ` +
            `--network ${network} ` +
            `${gov.address} ` +
            `"${timelock_address}" "${token_address}" "${guardian_address}" "${dao_name}"`

        console.log("\n" + verify_str)

        // save it to a file to make sure the user doesn't lose it.
        fs.appendFileSync('contracts.out', `Governance contract deployed at: ${gov.address}\n${verify_str}\n\n`);

    });


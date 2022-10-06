const { timelock } = require('../../helpers/compound_deploy');
const fs = require('fs');

task('oz_timelock', "Deploys a timelock contract with the given delay. You have to deploy the governance after it.")
    .addParam("delay", "The delay time in seconds between 172800 and 2592000.")
    .setAction(async (taskArgs, hre) => {
        console.log("Deploying a Compound style Timelock contract");

        const signer = await hre.ethers.getSigner()

        // HARDHAT LOG
        console.log(
            `network:\x1B[36m${hre.network.name}\x1B[37m`,
            `\nsigner:\x1B[33m${signer.address}\x1B[37m\n`
        );

        // TIMELOCK DATA
        const timelock_delay = taskArgs.delay;
        const admin_address = await getExpectedContractAddress(signer, 2);

        // INFO LOGS
        console.log("network:\x1B[32m", network, "\x1B[37m, provider connection:", provider.connection);
        console.log("admin address:\x1B[33m", admin_address, "\x1B[37m\n");
        console.log("timelock delay:\x1B[35m", timelock_delay, "\x1B[37m");

        //  DEPLOY TIMELOCK
        const time = await timelock(
            admin_address,
            timelock_delay,
            signer
        );

        const lb = await hre.ethers.provider.getBlock("latest")

        // DEPLOYMENT LOGS
        console.log(`Timelock deployed to:\x1B[33m`, time.address, "\x1B[37m");
        console.log(`Creation block number:\x1B[35m`, lb.number, "\x1B[37m");
        console.log(`Deploy your DAO now, to use the expected admin in the timelock contract.`)

        // verify cli command
        const verify_str = `npx hardhat verify ` +
            `--network ${network.name} ` +
            `${time.address} ` +
            `"${admin_address}" "${timelock_delay}"`

        console.log("\n" + verify_str)

        // save it to a file to make sure the user doesn't lose it.
        fs.appendFileSync('contracts.out', `${new Date()}\nTimelock contract deployed at: ${time.address}  - ${network.address}\n${verify_str}\n\n`);

    });


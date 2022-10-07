const { timelock } = require('../../helpers/');
const fs = require('fs');

task('oz_timelock', "Deploys a timelock contract with the given delay. You have to deploy the governance after it.")
    .addOptionalParam("delay", "The minium delay time in seconds,recomended between 172800 and 2592000.")
    .addOptionalParam("proposers", "Proposers are addresses separate by comma.")
    .addOptionalParam("executors", "Executors are addresses separate by comma.")
    .setAction(async (taskArgs, hre) => {
        console.log("Deploying a OpenZepellin style of Timelock contract");

        const signer = await hre.ethers.getSigner();

        // HARDHAT LOG
        console.log(
            `network:\x1B[36m${hre.network.name}\x1B[37m`,
            `\nsigner:\x1B[33m${signer.address}\x1B[37m\n`
        );

        // TIMELOCK DATA
        const timelock_delay = taskArgs.delay ? taskArgs.delay : 172800;
        const proposers_string = taskArgs.proposers ? taskArgs.proposers : "";
        const executors_string = taskArgs.proposers ? taskArgs.proposers : "";


        const admin_address = await getExpectedContractAddress(signer, 2);

        // TODO needs more work here.
        let proposers = [];
        let executors = [];
        proposers.push(admin_address);
        executors.push(admin_address);
        proposers.concat(proposers_string.split(','))
        executors.concat(executors_string.split(','))

        // INFO LOGS
        console.log("network:\x1B[32m", network, "\x1B[37m, provider connection:", provider.connection);
        console.log("admin address:\x1B[33m", admin_address, "\x1B[37m\n");
        console.log("timelock delay:\x1B[35m", timelock_delay, "\x1B[37m");

        //  DEPLOY TIMELOCK
        const time = await timelock(
            timelock_delay,
            proposers,
            executors,
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


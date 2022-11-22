const { timelockController } = require('../../helpers/openzeppelin_deploy');
const { getExpectedContractAddress } = require('../../helpers/expected_contract');

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
            `network:\x1B[36m ${hre.network.name}\x1B[37m`,
            `\nsigner:\x1B[33m ${signer.address}\x1B[37m\n`
        );

        // TIMELOCK DATA
        const timelock_delay = taskArgs.delay ? taskArgs.delay : 172800;
        const proposers_string = taskArgs.proposers ? taskArgs.proposers : "";
        const executors_string = taskArgs.proposers ? taskArgs.proposers : "";


        const admin_address = await getExpectedContractAddress(signer, 2);

        let proposers = [];
        let executors = [];
        proposers.push(admin_address);
        executors.push(admin_address);

        if( proposers_string.length > 0 ){
            if (new RegExp('\\b'+","+'\\b', 'i').test(proposers_string) ){
                proposers.concat(proposers_string.split(','))
            }else{
                proposers.push(proposers_string)
            }
        }

        if( executors_string.length > 0 ){
            if (new RegExp('\\b'+","+'\\b', 'i').test(executors_string) ){
                executors.concat(executors_string.split(','))
            }else{
                executors.push(executors_string)
            }
        }

        // INFO LOGS
        console.log("gov_admin_address:\x1B[33m", admin_address, "\x1B[37m\n");
        console.log("timelock delay:\x1B[35m", timelock_delay, "\x1B[37m");

        console.log("executors",proposers)
        console.log("executors",executors)


        //  DEPLOY TIMELOCK
        const time = await timelockController(
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

        fs.appendFileSync(
            `arguments_${time.address}.j`,
            `module.exports = [
    ${timelock_delay},
    ${JSON.stringify(proposers)},
    ${JSON.stringify(executors)},
            ];`
        );

        // verify cli command
        const verify_str = `npx hardhat verify ` +
            `--network ${network.name} ` +
            `--constructor-args arguments_${time.address}.js`+
            ` ${time.address}`;

        console.log("\n" + verify_str)

        // save it to a file to make sure the user doesn't lose it.
        fs.appendFileSync('contracts.out', `${new Date()}\nTimelock contract deployed at: ${time.address}  - ${network.address}\n${verify_str}\n\n`);

    });


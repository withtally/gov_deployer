const { bravoDelegator } = require('../../helpers/compound_deploy');
const fs = require('fs');

task('bravo_delegator', "Deploys a Bravo governance contract.")
    .addParam("token", "The delay time in seconds between 172800 and 2592000.")
    .addParam("timelock", "The address of the timelock contract.")
    .addOptionalParam("admin", "The admin address. If not passed, the deployer address will be used.")
    .addParam("governance", "The address of the governance contract. Which implements the delegate.")
    .addOptionalParam("delay", "The delay time in seconds between 172800 and 2592000.")
    .addOptionalParam("threshold", "The threshold of the proposal.")
    .addOptionalParam("period", "The period that voting takes.")
    .setAction(async (taskArgs, hre) => {
        console.log("Deploying a Compound Alpha Governance contract");

        const signer = await hre.ethers.getSigner()

        // HARDHAT LOG
        console.log(
            `network:\x1B[36m${hre.network.name}\x1B[37m\n`,
            `signer:\x1B[33m${signer.address}\x1B[37m\n`
        );

        // CONSTANTS
        // Avoiding magic numbers
        const DEFAULT_VOTING_PERIOD = 10;
        const DEFAULT_VOTING_DELAY = 3600 * 24 * 5; // 5 Days
        const DEFAULT_PROPOSAL_THRESHOLD = 3600 * 24 * 10; // 10 Days

        // DAO DATA
        const timelock_address = taskArgs.timelock;
        const token_address = taskArgs.token;
        const admin_address = taskArgs.admin ? taskArgs.admin : signer.address;
        const implementation_address = taskArgs.governance;
        const voting_period = taskArgs.period ? taskArgs.period : DEFAULT_VOTING_PERIOD;
        const voting_delay = taskArgs.delay ? taskArgs.delay : DEFAULT_VOTING_DELAY;
        const proposal_threshold = taskArgs.threshold ? taskArgs.threshold : DEFAULT_PROPOSAL_THRESHOLD;

        // INFO LOGS
        console.log("timelock_address:\x1B[33m", timelock_address, "\x1B[37m\n");
        console.log("token_address:\x1B[33m", token_address, "\x1B[37m");
        console.log("admin_address:\x1B[33m", admin_address, "\x1B[37m");
        console.log("implementation_address:\x1B[33m", implementation_address, "\x1B[37m\n");
        console.log("voting_period:\x1B[36m", voting_period, "\x1B[37m");
        console.log("voting_delay:\x1B[36m", voting_delay, "\x1B[37m\n");
        console.log("proposal_threshold:\x1B[36m", proposal_threshold, "\x1B[37m");

        //  DEPLOY BRAVO GOVERNANCE DELEGATOR
        const gov = await bravoDelegator(
            timelock_address,
            token_address,
            admin_address,
            implementation_address, // delegate ?
            voting_period,
            voting_delay,
            proposal_threshold,
            signer
        )

        const lb = await provider.getBlock("latest")

        // DEPLOYMENT LOGS
        console.log(`Dao: \x1B[36m${dao_name}\x1B[37m deployed to:\x1B[33m`, gov.address, "\x1B[37m");
        console.log(`Creation block number:\x1B[35m"`, lb.number, "\x1B[37m");

        // verify cli
        const verify_str = `npx hardhat verify ` +
            `--network ${network} ` +
            `${gov.address} ` +
            `"${timelock_address}" "${token_address}" "${admin_address}" "${implementation_address}" ${voting_period} ${voting_delay} ${proposal_threshold}`

        console.log("\n" + verify_str);

        // save it to a file to make sure the user doesn't lose it.
        fs.appendFileSync('contracts.out', `Governance contract deployed at: ${gov.address}\n${verify_str}\n\n`);

    });



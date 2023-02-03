const { ozGovernor } = require('../../helpers/openzeppelin_deploy');
const fs = require('fs');

task('oz_governance', "Deploys a Open Zepellin governance contract. You have to deploy this after timelock. https://docs.openzeppelin.com/contracts/4.x/governance")
    .addParam("name", "The name of the DAO.")
    .addParam("token", "The token contract address.")
    .addParam("timelock", "The address of the timelock contract.")
    .addOptionalParam("delay", "Voting delay. How long after a proposal is created should voting power be fixed, 6570 blocks is 1 day.")
    .addOptionalParam("period", "Voting period. The voting period in blocks, 45992 blocks is 1 week.")
    .addOptionalParam("fraction", "Quorum Fraction. Fraction of quorum to approve.")
    .addOptionalParam("threshold", "Proposal threshold. Minimum token required for a proposal.")
    .setAction(async (taskArgs, hre) => {
        console.log("Deploying a Open Zepellin Governance contract");

        const signer = await hre.ethers.getSigner()

        // HARDHAT LOG
        console.log(
            `network:\x1B[36m${hre.network.name}\x1B[37m`,
            `\nsigner:\x1B[33m${signer.address}\x1B[37m\n`
        );

        // DAO DATA
        const dao_name = taskArgs.name;
        const token_address = taskArgs.token;
        const timelock_address = taskArgs.timelock;
        const voting_delay= taskArgs.delay ? taskArgs.delay : 100;
        const voting_period = taskArgs.period ? taskArgs.period : 45818;
        const quorum_fraction = taskArgs.fraction ? taskArgs.fraction : 60;
        const proposal_threshold = taskArgs.threshold ? taskArgs.threshold : 100;

        // INFO LOGS
        console.log("timelock_address:\x1B[33m", timelock_address, "\x1B[37m\n");
        console.log("token_address:\x1B[33m", token_address, "\x1B[37m");
        console.log("dao_name:\x1B[36m", dao_name, "\x1B[37m\n");
        console.log("voting_delay:\x1B[36m", voting_delay, "\x1B[37m\n");
        console.log("voting_period:\x1B[36m", voting_period, "\x1B[37m\n");
        console.log("quorum_fraction:\x1B[36m", quorum_fraction, "\x1B[37m\n");
        console.log("proposal_threshold:\x1B[36m", proposal_threshold, "\x1B[37m\n");

        //  DEPLOY OZ GOVERNANCE
        const gov = await ozGovernor(
            token_address,
            timelock_address,
            dao_name,
            voting_delay,
            voting_period,
            quorum_fraction,
            proposal_threshold,
            signer
        )
        
        const lb = await hre.ethers.provider.getBlock("latest")

        // DEPLOYMENT LOGS
        console.log(`OZ Dao: \x1B[36m${dao_name}\x1B[37m deployed to:\x1B[33m`, gov.address, "\x1B[37m");
        console.log(`Creation block number:\x1B[35m`, lb.number, "\x1B[37m");

        // verify cli
        const verify_str = `npx hardhat verify ` +
            `--network ${network.name} ` +
            `${gov.address} ` +
            `"${token_address}" "${timelock_address}" "${dao_name}" ${voting_delay} ${voting_period} ${quorum_fraction} ${proposal_threshold}`

        console.log("\n" + verify_str)

        // save it to a file to make sure the user doesn't lose it.
        fs.appendFileSync('contracts.out', `${new Date()}\nGovernance contract deployed at: ${gov.address}  - ${hre.network.name} - ${lb.number}\n${verify_str}\n\n`);

    });

const { erc20Votes,timelockController,ozGovernor } = require('../../helpers/openzeppelin_deploy');

const { getExpectedContractAddress } = require('../../helpers/expected_contract');
const fs = require('fs');

task('oz_dao', "Deploys all contracts, to have an OZ Governance DAO.")
    .addParam("name", "The name of the DAO.")
    .addParam("token", "The name of the token, e.g: \"Ether\".")
    .addParam("symbol", "The symbol of the token, e.g: \"ETH\".")
    .addParam("delay", "The delay time, for the timelock, in seconds, eg: 172800 and 2592000.")
    .addOptionalParam("vdelay", "Voting delay. How long after a proposal is created should voting power be fixed, 6570 blocks is 1 day.")
    .addOptionalParam("period", "Voting period. The voting period in blocks, 45992 blocks is 1 week.")
    .addOptionalParam("fraction", "Quorum Fraction. Fraction of quorum to approve.")
    .addOptionalParam("threshold", "Proposal threshold. Minimum token required for a proposal.")
    .addOptionalParam("proposers", "Proposers are addresses separate by comma.")
    .addOptionalParam("executors", "Executors are addresses separate by comma.")
    .setAction(async (taskArgs, hre) => {
        console.log("Deploying a OZ style voting token contract");

        const signer = await hre.ethers.getSigner();

        // HARDHAT LOG
        console.log(
            `network:\x1B[36m${hre.network.name}\x1B[37m`,
            `\nsigner:\x1B[33m${signer.address}\x1B[37m\n`
        );

        // token data
        const token_name = taskArgs.token;
        const token_symbol = taskArgs.symbol;

        // INFO LOGS
        console.log("token_name:\x1B[36m", token_name, "\x1B[37m");
        console.log("token_symbol:\x1B[36m", token_symbol, "\x1B[37m");

        //  DEPLOY TOKEN
        const token = await erc20Votes(
            token_name,
            token_symbol,
            signer
        )

        const tokenBlock = await hre.ethers.provider.getBlock("latest")

        // DEPLOYMENT LOGS
        console.log(`Token \x1B[36m${token_symbol}\x1B[37m deployed to:\x1B[33m`, token.address, "\x1B[37m");
        console.log(`Creation block number:`, tokenBlock.number);

        // verify cli
        const verify_str = `npx hardhat verify ` +
            `--network ${network.name} ` +
            `${token.address} ` +
            `"${token_name}" ${token_symbol}`

        console.log("\n" + verify_str)

        // save it to a file to make sure the user doesn't lose it.
        fs.appendFileSync('contracts.out', `${new Date()}\nToken contract deployed at: ${token.address}` +
        ` - ${hre.network.name} - ${tokenBlock.number}\n${verify_str}\n\n`);

        ///////////////// TIMELOCK DEPLOYMENT ///////////////////////////
        // TIMELOCK DATA
        console.log("Deploying a OpenZepellin style of Timelock contract");

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

        console.log("proposers",proposers)
        console.log("executors",executors)


        //  DEPLOY TIMELOCK
        const time = await timelockController(
            timelock_delay,
            proposers,
            executors,
            signer
        );

        const timelockBlock = await hre.ethers.provider.getBlock("latest")

        // DEPLOYMENT LOGS
        console.log(`Timelock deployed to:\x1B[33m`, time.address, "\x1B[37m");
        console.log(`Creation block number:\x1B[35m`, timelockBlock.number, "\x1B[37m");
        console.log(`Deploy your DAO now, to use the expected admin in the timelock contract.`)

        fs.appendFileSync(
            `arguments_${time.address}.js`,
            `module.exports = [
    ${timelock_delay},
    ${JSON.stringify(proposers)},
    ${JSON.stringify(executors)},
            ];`
        );

        // verify cli command
        const verify_str_timelock = `npx hardhat verify ` +
            `--network ${network.name} ` +
            `--constructor-args arguments_${time.address}.js`+
            `${time.address}\n`;

        console.log("\n" + verify_str_timelock)

        // save it to a file to make sure the user doesn't lose it.
        fs.appendFileSync('contracts.out', `${new Date()}\nTimelock contract deployed at: ${time.address}` +
        `  - ${hre.network.name} - block number:${timelockBlock.number}\n${verify_str_timelock}\n\n`);

        ///////////////// GOVERNANCE DEPLOYMENT ///////////////////////////
        // GOVERNANCE DATA
        console.log("Deploying a Open Zepellin Governance contract");

        // HARDHAT LOG
        console.log(
            `network:\x1B[36m${hre.network.name}\x1B[37m`,
            `\nsigner:\x1B[33m${signer.address}\x1B[37m\n`
        );

        // DAO DATA
        const dao_name = taskArgs.name;
        const token_address =  token.address;
        const timelock_address = time.address;
        const voting_delay= taskArgs.vdelay ? taskArgs.vdelay : 100;
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
        const verify_str_dao = `npx hardhat verify ` +
            `--network ${network.name} ` +
            `${gov.address} ` +
            `"${token_address}" "${timelock_address}" "${dao_name}" ${voting_delay} ${voting_period} ${quorum_fraction} ${proposal_threshold}\n`

        console.log("\n" + verify_str_dao)

        // save it to a file to make sure the user doesn't lose it.
        fs.appendFileSync('contracts.out', `${new Date()}\nGovernance contract deployed at: ${gov.address}` +
        `  - ${hre.network.name} - block number:${lb.number}\n${verify_str_dao}\n\n`);

    });
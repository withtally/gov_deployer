const { alphaGov, erc20comp, timelock } = require('../../helpers/compound_deploy');
const fs = require('fs');

task('bravo_dao', "Deploys all contracts, to have a Bravo Governance DAO.")
    .addParam("dao", "The name of the DAO.")
    .addParam("token", "The name of the token, e.g: \"Ether\".")
    .addParam("symbol", "The symbol of the token, e.g: \"ETH\".")
    .addParam("delay", "The delay time, for the timelock, in seconds between 172800 and 2592000.")
    .addOptionalParam("owner", "The token owner address. If not passed, the deployer address will be used.")
    .addOptionalParam("guardian", "The DAO guardian address. If not passed, the deployer address will be used.")
    .setAction(async (taskArgs, hre) => {
        console.log("Deploying a Compound Alpha Governance contract");

        const signer = await hre.ethers.getSigner()

        // HARDHAT LOG
        console.log(
            `network:\x1B[36m${hre.network.name}\x1B[37m`,
            `\nsigner:\x1B[33m${signer.address}\x1B[37m\n`
        );

        ///////////////// TOKEN DEPLOYMENT ///////////////////////////////
        // token data
        const token_name = taskArgs.name;
        const token_symbol = taskArgs.symbol;
        const token_owner = taskArgs.owner ? taskArgs.owner : signer.address;

        // INFO LOGS
        console.log("token_owner:\x1B[33m", token_owner, "\x1B[37m\n");
        console.log("token_name:\x1B[36m", token_name, "\x1B[37m");
        console.log("token_symbol:\x1B[36m", token_symbol, "\x1B[37m");
        
        //  DEPLOY TOKEN
        const token = await erc20comp(
            token_owner,
            token_name,
            token_symbol,
            signer
        )

        const blockToken = await hre.ethers.provider.getBlock("latest")

        // DEPLOYMENT LOGS
        console.log(`Token \x1B[36m${token_symbol}\x1B[37m deployed to:\x1B[33m`, token.address, "\x1B[37m");
        console.log(`Creation block number:`, blockToken.number);

        // verify cli
        const verify_str_token = `npx hardhat verify ` +
            `--network ${network.name} ` +
            `${token.address} ` +
            `${token_owner} "${token_name}" ${token_symbol}`
        console.log("\n" + verify_str_token)
        // save it to a file to make sure the user doesn't lose it.
        fs.appendFileSync('contracts.out', `Token contract deployed at: ${token.address}\n${verify_str_token}\n\n`);

        ///////////////// TIMELOCK DEPLOYMENT ///////////////////////////
        // TIMELOCK DATA
        const timelock_delay = taskArgs.delay;
        const admin_address = await getExpectedContractAddress(signer, 2);

        // INFO LOGS
        console.log("admin address:\x1B[33m", admin_address, "\x1B[37m\n");
        console.log("timelock delay:\x1B[35m", timelock_delay, "\x1B[37m");
        
        //  DEPLOY TIMELOCK
        const time = await timelock(
            admin_address,
            timelock_delay,
            signer
        );

        const timelockBlock = await hre.ethers.provider.getBlock("latest")

        // DEPLOYMENT LOGS
        console.log(`Timelock deployed to:\x1B[33m`, time.address, "\x1B[37m");
        console.log(`Creation block number:\x1B[35m"`, timelockBlock.number, "\x1B[37m");
        console.log(`Deploy your DAO now, to use the expected admin in the timelock contract.`)

        // verify cli command
        const verify_str_timelock = `npx hardhat verify ` +
            `--network ${network.name} ` +
            `${time.address} ` +
            `"${admin_address}" "${timelock_delay}"`

        console.log("\n" + verify_str_timelock)

        // save it to a file to make sure the user doesn't lose it.
        fs.appendFileSync('contracts.out', `Timelock contract deployed at: ${time.address}\n${verify_str_timelock}\n\n`);

        ///////////////// GOVERNANCE DEPLOYMENT ///////////////////////////
        // GOVERNANCE DATA
        const dao_name = taskArgs.name;
        const token_address = token.address;
        const timelock_address = time.address;
        const guardian_address = taskArgs.guardian ? argv.guardian : signer.address;

        // GOVERNANCE DATA LOGS
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

        const govBlock = await hre.ethers.provider.getBlock("latest")

        // DEPLOYMENT LOGS
        console.log(`Dao: \x1B[36m${dao_name}\x1B[37m deployed to:\x1B[33m`, gov.address, "\x1B[37m");
        console.log(`Creation block number:\x1B[35m"`, govBlock.number, "\x1B[37m");

        // verify cli
        const verify_str_governance = `npx hardhat verify ` +
            `--network ${network.name} ` +
            `${gov.address} ` +
            `"${timelock_address}" "${token_address}" "${guardian_address}" "${dao_name}"`

        console.log("\n" + verify_str_governance)

        // save it to a file to make sure the user doesn't lose it.
        fs.appendFileSync('contracts.out', `Governance contract deployed at: ${gov.address}\n${verify_str_governance}\n\n`);

    });
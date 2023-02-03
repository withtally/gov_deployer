const { bravoGovVanilla, bravoDelegator, bravoGovVanilla } = require('../../helpers/compound_deploy');
const fs = require('fs');

task('bravo_upgrade', "Deploys the new contract to upgrade for Bravo. This will create a new proposal which if voted can upgrade the DAO for this new bravo contracts.")
    .addParam("dao", "The name of the DAO.")
    .addParam("alpha", "The Alpha governance contract address")
    .addParam("token", "The token contract address")
    .addParam("timelock", "The timelock contract address")
    .addOptionalParam("period","The voting period, which is the number of blocks, from 5760 to 80640. (24 hour to 2 weeks)")
    .addOptionalParam("delay","The voting delay, which is the number of blocks, from 1 to 40320. (15 seconds to 1 week)")
    .addOptionalParam("threshold","The proposal threshold. Min ammount of Tokens 1000e18 to 100000e18")
    .addOptionalParam("guardian", "The DAO guardian address. If not passed, the deployer address will be used.")
    .setAction(async (taskArgs, hre) => {
        console.log("Deploying a Compound Bravo Governance Delegator and Delegate contract, and creates the new proposal in the Alpha gov to upgrade the DAO.");

        const signer = await hre.ethers.getSigner()

        // HARDHAT LOG
        console.log(
            `network:\x1B[36m${hre.network.name}\x1B[37m`,
            `\nsigner:\x1B[33m${signer.address}\x1B[37m\n`
        );

        // 0. CHECK IF THE ADDRESSES EXISTS AND ARE INDEED THE CONTRACTS
        
        // 1. CHECK THE ALPHA GOV THRESHOULD, IF SIGNER HAS IT
        
        // 2. DEPLOY CONTRACTS
        ///////////////// GOVERNANCE DEPLOYMENT ///////////////////////////

        ///////////////// DELEGATE DEPLOYMENT   ///////////////////////////
        // GOVERNANCE DATA
        const dao_name = taskArgs.dao;

        // GOVERNANCE DATA LOGS
        console.log("dao_name:\x1B[36m", dao_name, "\x1B[37m\n");

        //  DEPLOY BRAVO GOVERNANCE
        const gov = await bravoGovVanilla(
            dao_name,
            signer
        );

        const govBlock = await hre.ethers.provider.getBlock("latest")

        // DEPLOYMENT LOGS
        console.log(`Dao: \x1B[36m${dao_name}\x1B[37m deployed to:\x1B[33m`, gov.address, "\x1B[37m");
        console.log(`Creation block number:\x1B[35m`, govBlock.number, "\x1B[37m");

        // verify cli
        const verify_str_governance = `npx hardhat verify ` +
            `--network ${network.name} ` +
            `${gov.address} ` +
            `"${dao_name}"`

        console.log("\n" + verify_str_governance)

        // save it to a file to make sure the user doesn't lose it.
        fs.appendFileSync('contracts.out', `${new Date()}\nGovernance contract deployed at: ${gov.address} - ${hre.network.name} - ${govBlock.number}\n${verify_str_governance}\n\n`);
        
        ///////////////// DELEGATOR DEPLOYMENT ///////////////////////////
        // DELEGATOR DATA
        const timelock_address = taskArgs.timelock;
        const token_address = taskArgs.token;
        const implementation_address = gov.address;
        const guardian_address = taskArgs.guardian ? taskArgs.guardian : signer.address;
        const voting_delay =  taskArgs.delay ? taskArgs.delay :  12; // 12 blocks = 180segs +/- 3 minutos
        const voting_period = taskArgs.period ? taskArgs.period : 11520; // 48 houres
        const proposal_threshold = hre.ethers.BigNumber.from( (
            taskArgs.threshold ? taskArgs.threshold : 100000e18 // 100,000 = 1% of token
        ).toLocaleString('fullwide', {useGrouping:false}) );

        // DEPLOY BRAVO GOVERNANCE
        const del = await bravoDelegator(
            timelock_address,
            token_address,
            guardian_address,
            implementation_address, // delegate ?
            voting_period,
            voting_delay,
            proposal_threshold,
            signer
        );

        const delBlock = await hre.ethers.provider.getBlock("latest")

        // DEPLOYMENT LOGS
        console.log(`Delegator for \x1B[36m${dao_name}\x1B[37m deployed to:\x1B[33m`, del.address, "\x1B[37m");
        console.log(`Creation block number:\x1B[35m`, delBlock.number, "\x1B[37m");

        // verify cli
        const verify_str_delegator = `npx hardhat verify ` +
            `--network ${network.name} ` +
            `${del.address} ` +
            `"${timelock_address}" "${token_address}" "${guardian_address}" "${implementation_address}" `+
            `"${voting_period}" "${voting_delay}" "${proposal_threshold}"`

        console.log("\n" + verify_str_delegator)

        // save it to a file to make sure the user doesn't lose it.
        fs.appendFileSync('contracts.out', `${new Date()}\nDelegator contract deployed at: ${del.address} - ${hre.network.name} - ${delBlock.number}\n${verify_str_delegator}\n\n`);
        
        // 3. INTERACT WITH ALPHA AND CREATE PROPOSAL.

        ///////////////// CREATE PROPOSAL ///////////////////////////

        // create calldatas.

        // interact with contract to send it.


    });
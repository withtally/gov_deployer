const { bravoGov } = require('../../helpers/compound_deploy');
const fs = require('fs');

task('bravo_governance', "Deploys a Bravo governance contract.")
    .addParam("name", "The name of the DAO.")
    .setAction(async (taskArgs, hre) => {
        console.log("Deploying a Compound Bravo Governance contract");

        const signer = await hre.ethers.getSigner()

        // HARDHAT LOG
        console.log(
            `network:\x1B[36m${hre.network.name}\x1B[37m`,
            `\nsigner:\x1B[33m${signer.address}\x1B[37m\n`
        );

        // DAO DATA
        const dao_name = taskArgs.name;

        // INFO LOGS
        console.log("dao_name:\x1B[36m", dao_name, "\x1B[37m\n");

        //  DEPLOY BRAVO GOVERNANCE
        const gov = await bravoGov(
            dao_name,
            signer
        );

        const lb = await hre.ethers.provider.getBlock("latest")

        // DEPLOYMENT LOGS
        console.log(`Dao: \x1B[36m${dao_name}\x1B[37m deployed to:\x1B[33m`, gov.address, "\x1B[37m");
        console.log(`Creation block number:\x1B[35m"`, lb.number, "\x1B[37m");

        // verify cli
        const verify_str = `npx hardhat verify ` +
            `--network ${network.name} ` +
            `${gov.address} ` +
            `"${dao_name}"`

        console.log("\n" + verify_str)

        // save it to a file to make sure the user doesn't lose it.
        fs.appendFileSync('contracts.out', `Governance contract deployed at: ${gov.address}  - ${network.address}\n${verify_str}\n\n`);

    });


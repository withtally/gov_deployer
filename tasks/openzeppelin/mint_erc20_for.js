const { mint } = require('../../helpers/openzeppelin_deploy');
const fs = require('fs');

task('mint_oz_erc20', "Deploys a Open Zepellin governance contract. You have to deploy this after timelock. https://docs.openzeppelin.com/contracts/4.x/governance")
    .addParam("amount", "The token amount.")
    .addParam("to", "The address of who will receive.")
    .addParam("token", "The address of the token contract.")

    .setAction(async (taskArgs, hre) => {
        console.log("Minting tokens");

        const signer = await hre.ethers.getSigner()

        // HARDHAT LOG
        console.log(
            `network:\x1B[36m${hre.network.name}\x1B[37m`,
            `\nsigner:\x1B[33m${signer.address}\x1B[37m\n`
        );

        // MINT DATA
        const amount = taskArgs.amount;
        const to = taskArgs.to;
        const token_address = taskArgs.token;
   
        // INFO LOGS
        console.log("amount:\x1B[33m", amount, "\x1B[37m\n");
        console.log("to:\x1B[36m", to, "\x1B[37m\n");
        console.log("token_address:\x1B[36m", token_address, "\x1B[37m\n");

        //  MINT
        const receipt = await mint(
            token_address,
            to,
            amount,
            signer
        )
        
        console.log(receipt)

        // const lb = await hre.ethers.provider.getBlock("latest")

        // console.log(`OZ Dao: \x1B[36m${dao_name}\x1B[37m deployed to:\x1B[33m`, gov.address, "\x1B[37m");
        // console.log(`Creation block number:\x1B[35m`, lb.number, "\x1B[37m");

        // // verify cli
        // const verify_str = `npx hardhat verify ` +
        //     `--network ${network.name} ` +
        //     `${gov.address} ` +
        //     `"${token_address}" "${timelock_address}" "${dao_name}" ${voting_delay} ${voting_period} ${quorum_fraction} ${proposal_threshold}`

        // console.log("\n" + verify_str)

        // // save it to a file to make sure the user doesn't lose it.
        // fs.appendFileSync('contracts.out', `${new Date()}\nGovernance contract deployed at: ${gov.address}  - ${hre.network.name} - block number:${lb.number}\n${verify_str}\n\n`);

    });

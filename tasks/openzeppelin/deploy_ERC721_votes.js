const { erc721votes } = require('../../helpers/openzeppelin_deploy');
const fs = require('fs');

task('nft_votes', "Deploys a OpenZeppelin voting nftoken contract")
    .addParam("name", "The token name. eg: BoredApe Yatch Club")
    .addParam("symbol", "The token symbol. eg: Bored Ape")
    .setAction(async (taskArgs, hre) => {
        console.log("Deploying a OZ style voting nftoken contract");

        const signer = await hre.ethers.getSigner()

        // HARDHAT LOG
        console.log(
            `network:\x1B[36m${hre.network.name}\x1B[37m`,
            `\nsigner:\x1B[33m${signer.address}\x1B[37m\n`
        );

        // token data
        const token_name = taskArgs.name;
        const token_symbol = taskArgs.symbol;

        // INFO LOGS
        console.log("token_name:\x1B[36m", token_name, "\x1B[37m");
        console.log("token_symbol:\x1B[36m", token_symbol, "\x1B[37m");

        //  DEPLOY TOKEN
        const token = await erc721votes(
            token_name,
            token_symbol,
            signer
        )

        const lb = await hre.ethers.provider.getBlock("latest")

        // DEPLOYMENT LOGS
        console.log(`Token \x1B[36m${token_symbol}\x1B[37m deployed to:\x1B[33m`, token.address, "\x1B[37m");
        console.log(`Creation block number:`, lb.number);

        // verify cli
        const verify_str = `npx hardhat verify ` +
            `--network ${network.name} ` +
            `${token.address} ` +
            `"${token_name}" ${token_symbol}`

        console.log("\n" + verify_str)

        // save it to a file to make sure the user doesn't lose it.
        fs.appendFileSync('contracts.out', `${new Date()}\nToken contract deployed at: ${token.address}  - ${hre.network.name} - block number:${lb.number}\n${verify_str}\n\n`);

    });


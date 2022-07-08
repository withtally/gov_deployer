const { erc20Wrapper, erc20Votes } = require('../../helpers/openzeppelin_deploy');
const fs = require('fs');

task('wrapped_token', "Deploys a OpenZeppelin voting token contract")
    .addParam("name", "The token name. eg: Ethereum")
    .addParam("symbol", "The token symbol. eg: ETH")
    .setAction(async (taskArgs, hre) => {
        console.log("Deploying a OZ style voting token contract");

        const signer = await hre.ethers.getSigner()

        // HARDHAT LOG
        console.log(
            `network:\x1B[36m${hre.network.name}\x1B[37m\n`,
            `signer:\x1B[33m${signer.address}\x1B[37m\n`
        );

        // token data
        const token_name = taskArgs.name;
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

        const lb = await hre.ethers.provider.getBlock("latest")

        // DEPLOYMENT LOGS
        console.log(`Token \x1B[36m${token_symbol}\x1B[37m deployed to:\x1B[33m`, token.address, "\x1B[37m");
        console.log(`Creation block number:`, lb.number);

        // verify cli
        const verify_str = `npx hardhat verify ` +
            `--network ${network} ` +
            `${token.address} ` +
            `"${token_name}" ${token_symbol}`

        console.log("\n" + verify_str)

        // save it to a file to make sure the user doesn't lose it.
        fs.appendFileSync('contracts.out', `Token contract deployed at: ${token.address}\n${verify_str}\n\n`);

    });


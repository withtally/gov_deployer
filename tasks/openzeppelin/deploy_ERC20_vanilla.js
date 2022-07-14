const { erc20 } = require('../../helpers/openzeppelin_deploy');
const fs = require('fs');

task('vanilla_token', "Deploys a Vanilla OpenZeppelin token contract")
    .addParam("name", "The token name. eg: Ethereum")
    .addParam("symbol", "The token symbol. eg: ETH")
    .addOptionalParam("owner", "The account's address of the token owner")
    .addOptionalParam("decimals", "The account's address of the token owner")
    .addOptionalParam("supply", "The account's address of the token owner")
    .setAction(async (taskArgs, hre) => {
        console.log("Deploying a OZ vanilla style ERC20 token contract");

        const signer = await hre.ethers.getSigner()

        // HARDHAT LOG
        console.log(
            `network:\x1B[36m${hre.network.name}\x1B[37m`,
            `\nsigner:\x1B[33m${signer.address}\x1B[37m\n`
        );

        // Avoiding magic numbers
        const ten_million = 10 * 10 ** 6; // 10 million Comp
        const decimals_18 = 18;

        // token data
        const token_name = taskArgs.name;
        const token_symbol = taskArgs.symbol;
        const token_owner = taskArgs.owner ? taskArgs.owner : signer.address;
        const token_decimals = taskArgs.decimal ? taskArgs.decimal : decimals_18;
        const token_totalSupply = taskArgs.supply ? taskArgs.supply : ten_million * 10 ** token_decimals;

        // INFO LOGS
        console.log("token_owner:\x1B[33m", token_owner, "\x1B[37m\n");
        console.log("token_name:\x1B[36m", token_name, "\x1B[37m");
        console.log("token_symbol:\x1B[36m", token_symbol, "\x1B[37m");
        console.log("token_decimals:\x1B[36m", token_decimals, "\x1B[37m");
        console.log("token_totalSupply:\x1B[36m", token_totalSupply, "\x1B[37m");

        //  DEPLOY TOKEN
        const token = await erc20(
            token_name,
            token_symbol,
            token_decimals,
            token_totalSupply,
            token_owner,
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
            `${token_name}  ${token_symbol} "${token_decimals}" ${token_totalSupply} ${token_owner}`

        console.log("\n" + verify_str)

        // save it to a file to make sure the user doesn't lose it.
        fs.appendFileSync('contracts.out', `Token contract deployed at: ${token.address}  - ${network.address}\n${verify_str}\n\n`);

    });


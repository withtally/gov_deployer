const { getExpectedContractAddress } = require('../helpers/expected_contract');


task('expected_contract', "next contract expected address, use 2 if you're deploying a timelock")
    .addParam("number", "The token name. eg: Ethereum")
    .setAction(async (taskArgs, hre) => {
        console.log("Deploying a Compound style ERC20 token contract");

        const signer = await hre.ethers.getSigner()

        // HARDHAT LOG
        console.log(
            `network:\x1B[36m${hre.network.name}\x1B[37m`,
            `\nsigner:\x1B[33m${signer.address}\x1B[37m\n`
        );

        // token data
        const number = taskArgs.number;

        // INFO LOGS
        console.log("number:\x1B[33m", number, "\x1B[37m\n");

        // EXPECTED CONTRACT
        const admin_address = await getExpectedContractAddress(signer, number);
        
        console.log(`Expected contract will be: \x1B[33m${admin_address}\x1B[37m\n`)
    
    });


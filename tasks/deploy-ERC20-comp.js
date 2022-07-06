task('balance2', "Prints an account's balance")
  .addOptionalParam('account', "The account's address")
  .setAction(async (taskArgs) => {
    const account = taskArgs.account || (await hre.ethers.getSigner()).address;
    const balance = await hre.ethers.provider.getBalance(account);
    console.log(`Account balance : ${balance}`);
});
const { SignerWithAddress} = require("@nomiclabs/hardhat-ethers/signers");
require("ethers");

const getExpectedContractAddress = async (deployer, actionsAfter) => {
  
  const adminAddressTransactionCount = await deployer.getTransactionCount();

  const expectedContractAddress = ethers.utils.getContractAddress({
    from: deployer.address,
    nonce: adminAddressTransactionCount + actionsAfter,
  });

  return expectedContractAddress;
};

module.exports.getExpectedContractAddress = getExpectedContractAddress;
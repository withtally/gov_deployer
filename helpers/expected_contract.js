import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "ethers";

export const getExpectedContractAddress = async (deployer: SignerWithAddress, actionsAfter: number) => {
  
  const adminAddressTransactionCount = await deployer.getTransactionCount();

  const expectedContractAddress = ethers.utils.getContractAddress({
    from: deployer.address,
    nonce: adminAddressTransactionCount + actionsAfter,
  });

  return expectedContractAddress;
};
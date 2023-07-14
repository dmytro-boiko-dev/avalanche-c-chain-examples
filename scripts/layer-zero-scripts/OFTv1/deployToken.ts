import {
    Contract,
    ContractFactory
} from "ethers"
import {ethers} from "hardhat";

/**
 * run command:
 * npx hardhat run scripts/layer-zero-scripts/OFTv1/deployToken.ts --network NETWORK_NAME
 */

const main = async (): Promise<any> => {
    const Token: ContractFactory = await ethers.getContractFactory("Token");
    const token: Contract = await Token.deploy("Token OFTv1", "TOFT", 100_000_000);

    await token.deployed();
    console.log(`Token deployed to: ${token.address}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    });

import {
    Contract,
    ContractFactory
} from "ethers"
import {ethers} from "hardhat";

/**
 * run command:
 * npx hardhat run scripts/layer-zero-scripts/OFTv1/deployTokenOFT.ts --network NETWORK_NAME
 */

const GOERLI_LZ_ENDPOINT: string = "0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23";

const main = async (): Promise<any> => {
    const TokenOFT: ContractFactory = await ethers.getContractFactory("TokenOFT");
    const tokenOFT: Contract = await TokenOFT.deploy("Token OFTv1", "TOFT", GOERLI_LZ_ENDPOINT);

    await tokenOFT.deployed();
    console.log(`TokenOFT deployed to: ${tokenOFT.address}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    });

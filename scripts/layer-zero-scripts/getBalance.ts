import {Contract} from "ethers";
import {ethers} from "hardhat";

require('dotenv').config();

/**
 * run command:
 * npx hardhat run scripts/layer-zero-scripts/getBalance.ts --network NAME
 */

const main = async (): Promise<any> => {
    const goerliTokenContract: string = process.env.GOERLI_TOKEN_CONTRACT;
    const fujiTokenContract: string = process.env.FUJI_TOKEN_CONTRACT;

    const signers = await ethers.getSigners();
    const owner = signers[0];

    // const lzFujiTokenContract: Contract = await ethers.getContractAt("CrossChainToken", fujiTokenContract, owner);
    const lzGoerliTokenContract: Contract = await ethers.getContractAt("CrossChainToken", goerliTokenContract, owner);

    // get balance
    const balance = await lzGoerliTokenContract.balanceOf(owner.address);
    // const balance = await lzFujiTokenContract.balanceOf(owner.address);
    console.log("owner : " + owner.address);
    console.log("balance     : " + ethers.utils.formatEther(balance));
    console.log('-------------------------------------------------------');
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    });

import {Contract} from "ethers";
import {ethers} from "hardhat";

require('dotenv').config();

/**
 * Send a message from Chain_A to Chain_B
 * run command:
 * npx hardhat run scripts/layer-zero-scripts/sendTokens.ts --network NAME
 */

const main = async (): Promise<any> => {
    // const goerliTokenContract: string = process.env.GOERLI_TOKEN_CONTRACT;
    const fujiTokenContract: string = process.env.FUJI_TOKEN_CONTRACT;

    const signers = await ethers.getSigners();
    const owner = signers[0];

    const lzFujiTokenContract: Contract = await ethers.getContractAt("CrossChainToken", fujiTokenContract, owner);
    // const lzGoerliTokenContract: Contract = await ethers.getContractAt("CrossChainToken", goerliTokenContract, owner);

    // get balance
    // const balanceBefore = await lzGoerliTokenContract.connect(owner).balanceOf(owner.address);
    const balanceBefore = await lzFujiTokenContract.connect(owner).balanceOf(owner.address);
    console.log("balance before: " + ethers.utils.formatEther(balanceBefore));
    console.log('-------------------------------------------------------');

    // const tx0 = await lzGoerliTokenContract.connect(owner).bridge(ethers.utils.parseEther("2000"), {
    const tx0 = await lzFujiTokenContract.connect(owner).bridge(ethers.utils.parseEther("2000"), {
        // gasLimit: 300000,
        // value: ethers.utils.parseEther("0.01") // goerli
        value: ethers.utils.parseEther("2.0") // fuji
    });

    const receipt = await tx0.wait();
    console.log('-------------------------------------------------------');
    console.log(tx0.hash, receipt);
    console.log('-------------------------------------------------------');
    // const balanceAfter = await lzGoerliTokenContract.connect(owner).balanceOf(owner.address);
    const balanceAfter = await lzFujiTokenContract.connect(owner).balanceOf(owner.address);
    console.log("balance after transfer: " + ethers.utils.formatEther(balanceAfter));
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    });

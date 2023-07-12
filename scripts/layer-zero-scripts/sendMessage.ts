import {Contract} from "ethers";
import {ethers} from "hardhat";

require('dotenv').config();

/**
 * Send a message from Chain_A to Chain_B
 * run command:
 * npx hardhat run scripts/layer-zero-scripts/sendMessage.ts --network NAME
 */

const main = async (): Promise<any> => {
    // const goerliContract: string = "0xDdA8b586474b8Adff73F73A01BbF614a5A49ac76";
    const fujiContract: string = "0x8e401e30857995Bf4ed9084A8Acf728C7B5fA195";

    const signers = await ethers.getSigners();
    const owner = signers[0];

    // todo: stage 1: set goerli contract as trusted to fuji contract
    const lzFujiContract: Contract = await ethers.getContractAt("LayerZeroTest", fujiContract, owner);
    // const lzGoerliContract: Contract = await ethers.getContractAt("LayerZeroTest", goerliContract, owner);

    const tx0 = await lzFujiContract.connect(owner).send("Hello from Fuji", {
    // const tx0 = await lzGoerliContract.connect(owner).send("Hello from Goerli", {
        gasLimit: 300000,
        // value: ethers.utils.parseEther("0.01") // goerli
        value: ethers.utils.parseEther("2.0") // fuji
    });

    const receipt = await tx0.wait();
    console.log('-------------------------------------------------------');
    console.log(tx0.hash, receipt);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    });

import {Contract} from "ethers";
import {ethers} from "hardhat";

require('dotenv').config();

/**
 * Get a message from a contract
 * run command:
 * npx hardhat run scripts/layer-zero-scripts/getMessage.ts --network NAME
 */

const main = async (): Promise<any> => {
    const goerliContract: string = "0xDdA8b586474b8Adff73F73A01BbF614a5A49ac76";
    const fujiContract: string = "0x8e401e30857995Bf4ed9084A8Acf728C7B5fA195";

    const signers = await ethers.getSigners();
    const owner = signers[0];

    // todo: stage 1: set goerli contract as trusted to fuji contract
    // const lzContract: Contract = await ethers.getContractAt("LayerZeroTest", fujiContract, owner);
    const lzContract: Contract = await ethers.getContractAt("LayerZeroTest", goerliContract, owner);

    console.log('-------------------------------------------------------');
    const message = await lzContract.connect(owner).data();
    console.log("message: " + message);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    });

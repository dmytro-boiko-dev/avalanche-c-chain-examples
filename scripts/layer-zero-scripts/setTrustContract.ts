import {Contract} from "ethers";
import {ethers} from "hardhat";

require('dotenv').config();

/**
 * Set trust contract on opposite chain
 * run command:
 * npx hardhat run scripts/layer-zero-scripts/setTrustContract.ts --network NAME
 */

const main = async (): Promise<any> => {
    const goerliContract: string = "0xDdA8b586474b8Adff73F73A01BbF614a5A49ac76";
    const fujiContract: string = "0x8e401e30857995Bf4ed9084A8Acf728C7B5fA195";

    const signers = await ethers.getSigners();
    const owner = signers[0];

    // todo: stage 1: set goerli contract as trusted to fuji contract
    // const lzGoerliContract: Contract = await ethers.getContractAt("LayerZeroTest", goerliContract, owner);
    // const tx = await lzGoerliContract.connect(owner).trustAddress(fujiContract);

    // todo: stage 2: set fuji contract as trusted to goerli contract
    const lzFujiContract: Contract = await ethers.getContractAt("LayerZeroTest", fujiContract, owner);
    const tx = await lzFujiContract.connect(owner).trustAddress(goerliContract);

    const receipt = await tx.wait();
    console.log(tx.hash, receipt);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    });

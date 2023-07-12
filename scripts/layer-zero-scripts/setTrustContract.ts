import {Contract} from "ethers";
import {ethers} from "hardhat";

require('dotenv').config();

/**
 * Set trust contract on opposite chain
 *
 * run command:
 * npx hardhat run scripts/layer-zero-scripts/setTrustContract.ts --network NAME
 */

const main = async (): Promise<any> => {
    const goerliContract: string = process.env.GOERLI_CONTRACT;
    const fujiContract: string = process.env.FUJI_CONTRACT;

    const goerliTokenContract: string = process.env.GOERLI_TOKEN_CONTRACT;
    const fujiTokenContract: string = process.env.FUJI_TOKEN_CONTRACT;

    const signers = await ethers.getSigners();
    const owner = signers[0];

    // todo: stage 1: set goerli contract as trusted to fuji contract
    // const lzGoerliContract: Contract = await ethers.getContractAt("LayerZeroTest", goerliContract, owner);
    // const tx = await lzGoerliContract.connect(owner).trustAddress(fujiContract);

    // tokens contract Goerli
    const lzGoerliTokenContract: Contract = await ethers.getContractAt("CrossChainToken", goerliTokenContract, owner);
    const tx = await lzGoerliTokenContract.connect(owner).trustAddress(fujiTokenContract);

    // todo: stage 2: set fuji contract as trusted to goerli contract
    // const lzFujiContract: Contract = await ethers.getContractAt("LayerZeroTest", fujiContract, owner);
    // const tx = await lzFujiContract.connect(owner).trustAddress(goerliContract);

    // tokens contract Fuji
    // const lzFujiTokenContract: Contract = await ethers.getContractAt("CrossChainToken", fujiTokenContract, owner);
    // const tx = await lzFujiTokenContract.connect(owner).trustAddress(goerliTokenContract);

    const receipt = await tx.wait();
    console.log(tx.hash, receipt);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    });

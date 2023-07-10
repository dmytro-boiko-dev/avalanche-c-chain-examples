import {
    Contract,
    ContractFactory
} from "ethers"
import {ethers} from "hardhat";

/**
 * deploy command: npx hardhat run scripts/deployLayerZero.ts --network fuji
 */

const main = async (): Promise<any> => {
    const LayerZeroTest: ContractFactory = await ethers.getContractFactory("LayerZeroTest");

    // Fuji (Avalanche Testnet) & destination chain id (Goerli)
    const lzContract: Contract = await LayerZeroTest.deploy("0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706", 10121);

    await lzContract.deployed();
    console.log(`lzContract deployed to: ${lzContract.address}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    });

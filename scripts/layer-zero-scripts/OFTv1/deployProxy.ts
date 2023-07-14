import {
    Contract,
    ContractFactory
} from "ethers"
import {ethers} from "hardhat";

/**
 * run command:
 * npx hardhat run scripts/layer-zero-scripts/OFTv1/deployProxy.ts --network NETWORK_NAME
 */

const FUJI_LZ_ENDPOINT: string = "0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706";
const TOKEN_ADDRESS: string = "0xced36041886289cEcE85197991938DCD991427ad";

const main = async (): Promise<any> => {
    const Proxy: ContractFactory = await ethers.getContractFactory("Proxy");
    const proxy: Contract = await Proxy.deploy(FUJI_LZ_ENDPOINT, TOKEN_ADDRESS);

    await proxy.deployed();
    console.log(`Proxy deployed to: ${proxy.address}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    });

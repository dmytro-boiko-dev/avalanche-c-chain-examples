import {Contract} from "ethers";
import {ethers} from "hardhat";

require('dotenv').config();

/**
 * Get balance of a token
 *
 * run command:
 * npx hardhat run scripts/layer-zero-scripts/OFTv1/getBalance.ts --network NAME
 */

const main = async (): Promise<any> => {
    const TOKEN_CONTRACT: string = "0xced36041886289cEcE85197991938DCD991427ad";

    const signers = await ethers.getSigners();
    const owner = signers[0];

    const token: Contract = await ethers.getContractAt("Token", TOKEN_CONTRACT, owner);

    // get balance
    const balance = await token.balanceOf(owner.address);

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

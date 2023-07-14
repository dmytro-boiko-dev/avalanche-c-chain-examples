import {
    Contract,
} from "ethers"
import {ethers} from "hardhat";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

/**
 * This script approves sets allowance to the Proxy contract on a source chain to use an amount of ERC20 tokens
 *
 * run command:
 * npx hardhat run scripts/layer-zero-scripts/OFTv1/approveProxy.ts --network SOURCE_NETWORK_NAME
 */

const main = async (): Promise<any> => {

    // Proxy on Fuji
    const TOKEN_CONTRACT: string = "0xced36041886289cEcE85197991938DCD991427ad";
    const PROXY_CONTRACT: string = "0x4787d1aC53751E32f8BF1bAA719Bcb5e78e7c226";

    const signers: SignerWithAddress[] = await ethers.getSigners();
    const owner: SignerWithAddress = signers[0];

    const token: Contract = await ethers.getContractAt("Token", TOKEN_CONTRACT, owner);

    // (spender, amount)
    const tx = await token.connect(owner).approve(PROXY_CONTRACT, ethers.utils.parseEther("3000"));
    const receipt = await tx.wait();
    console.log(tx.hash, receipt);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    });

import {
    Contract,
} from "ethers"
import {ethers} from "hardhat";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

/**
 * docs: https://layerzero.gitbook.io/docs/evm-guides/master/set-trusted-remotes
 *
 * run command:
 * npx hardhat run scripts/layer-zero-scripts/OFTv1/setTrustedRemoteOnSource.ts --network NETWORK_NAME
 */

const main = async (): Promise<any> => {

    // Proxy on Fuji
    const SOURCE_CHAIN_CONTRACT: string = "0x4787d1aC53751E32f8BF1bAA719Bcb5e78e7c226";
    // TokenOFT on Goerli
    const DESTINATION_CHAIN_CONTRACT: string = "0x000265857A8A73272F44D484BD95648E2C4A0cf8";

    const signers: SignerWithAddress[] = await ethers.getSigners();
    const owner: SignerWithAddress = signers[0];

    const lzProxy: Contract = await ethers.getContractAt("Proxy", SOURCE_CHAIN_CONTRACT, owner);

    let trustedRemote: string = ethers.utils.solidityPack(
        ['address', 'address'],
        [DESTINATION_CHAIN_CONTRACT, SOURCE_CHAIN_CONTRACT]
    )

    // 'remoteChainId' is a destination chain ID (10121 === Goerli)
    // 'trustedRemote' is 40 bytes object of the REMOTE + LOCAL contract addresses
    const tx = await lzProxy.connect(owner).setTrustedRemote(10121, trustedRemote);
    const receipt = await tx.wait();
    console.log(tx.hash, receipt);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    });

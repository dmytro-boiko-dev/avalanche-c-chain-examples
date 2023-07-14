import {
    Contract,
} from "ethers"
import {ethers} from "hardhat";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

/**
 * docs: https://layerzero.gitbook.io/docs/evm-guides/master/set-trusted-remotes
 *
 * run command:
 * npx hardhat run scripts/layer-zero-scripts/OFTv1/setTrustedRemoteOnDestination.ts --network NETWORK_NAME
 */

const main = async (): Promise<any> => {

    // TokenOFT on Goerli
    const SOURCE_CHAIN_CONTRACT: string = "0x000265857A8A73272F44D484BD95648E2C4A0cf8";
    // Proxy on Fuji
    const DESTINATION_CHAIN_CONTRACT: string = "0x4787d1aC53751E32f8BF1bAA719Bcb5e78e7c226";

    const signers: SignerWithAddress[] = await ethers.getSigners();
    const owner: SignerWithAddress = signers[0];

    const lxTokenOFT: Contract = await ethers.getContractAt("TokenOFT", SOURCE_CHAIN_CONTRACT, owner);

    // here chains are swapped in comparison to setTrustedRemoteOnSource
    let trustedRemote: string = ethers.utils.solidityPack(
        ['address', 'address'],
        [DESTINATION_CHAIN_CONTRACT, SOURCE_CHAIN_CONTRACT]
    )

    // 'remoteChainId' is a destination chain ID (10106 === Fuji)
    // 'trustedRemote' is 40 bytes object of the REMOTE + LOCAL contract addresses
    const tx = await lxTokenOFT.connect(owner).setTrustedRemote(10106, trustedRemote);
    const receipt = await tx.wait();
    console.log(tx.hash, receipt);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    });

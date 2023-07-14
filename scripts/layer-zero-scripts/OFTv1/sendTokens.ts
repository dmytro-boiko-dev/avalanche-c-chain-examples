import {
    Contract,
} from "ethers"
import {ethers} from "hardhat";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

/**
 * This script sends tokens from a SOURCE chain to aDESTINATION chain
 *
 * run command:
 * npx hardhat run scripts/layer-zero-scripts/OFTv1/sendTokens.ts --network SOURCE_NETWORK_NAME
 */

const main = async (): Promise<any> => {

    // Proxy on Fuji
    const PROXY_CONTRACT: string = "0x4787d1aC53751E32f8BF1bAA719Bcb5e78e7c226";

    const signers: SignerWithAddress[] = await ethers.getSigners();
    const owner: SignerWithAddress = signers[0];

    const lxProxy: Contract = await ethers.getContractAt("Proxy", PROXY_CONTRACT, owner);

    // 200k is default amount of gas; can be more if needed
    // docs: https://layerzero.gitbook.io/docs/evm-guides/advanced/relayer-adapter-parameters
    // v1 adapterParams, encoded for version 1 style, and 200k gas quote
    // const adapterParams: string = ethers.utils.solidityPack(
    //     ['uint16', 'uint256'],
    //     [1, 200000]
    // );

    // must be empty in some reason
    const emptyArray: string = ethers.utils.solidityPack([], []);

    /**
     * @dev send `_amount` amount of token to (`_dstChainId`, `_toAddress`) from `_from`
     * @params:
     * `_from` the owner of token
     * `_dstChainId` the destination chain identifier
     * `_toAddress` can be any size depending on the `dstChainId`.
     * `_amount` the quantity of tokens in wei
     * `_refundAddress` the address LayerZero refunds if too much message fee is sent
     * `_zroPaymentAddress` set to address(0x0) if not paying in ZRO (LayerZero Token)
     * `_adapterParams` is a flexible bytes array to indicate messaging adapter services (gas amount)
     */
        // chainId 10121 === Goerli
        // todo: _toAddress - is OWNER or TokenOFT ???
        // _refundAddress === owner address on source chain
    const zeroAddress: string = "0x0000000000000000000000000000000000000000";

    const tx = await lxProxy.connect(owner).sendFrom(
        owner.address,
        10121,
        owner.address,
        ethers.utils.parseEther("3000"),
        owner.address,
        zeroAddress,
        emptyArray,
        {value: ethers.utils.parseEther("2.0")} // fuji
    );

    const receipt = await tx.wait();
    console.log(tx.hash, receipt);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    });

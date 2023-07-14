//SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "../imported/OFT.sol";

///////////////////////////////////////////////
// This contract must be deployed to the DESTINATION chain
///////////////////////////////////////////////

contract TokenOFT is OFT {
    constructor(
        string memory _name,
        string memory _symbol,
        address _lzEndpoint
    )OFT(_name, _symbol, _lzEndpoint) {}
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "@layerzerolabs/oft/extension/ProxyOFT.sol";
import "../imported/ProxyOFT.sol";

contract Proxy is ProxyOFT {
    constructor(address _lzEndpoint, address _token) ProxyOFT(_lzEndpoint, _token){}
}

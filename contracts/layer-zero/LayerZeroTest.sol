// SPDX-License-Identifier: MIT
pragma solidity >=0.8.17;

import "./imported/NonblockingLzApp.sol";

contract LayerZeroTest is NonblockingLzApp {
    string public data = "Nothing received yet";
    uint16 private destChainId; // modifier added
    
    constructor(address _lzEndpoint, uint16 _destChainId) NonblockingLzApp(_lzEndpoint) {
        destChainId = _destChainId;
    }

    function _nonblockingLzReceive(uint16, bytes memory, uint64, bytes memory _payload) internal override {
       data = abi.decode(_payload, (string));
    }

    function send(string memory _message) public payable {
        bytes memory payload = abi.encode(_message);
        _lzSend(
            destChainId,
            payload,
            payable(msg.sender),
            address(0x0),
            bytes(""),
            msg.value
        );
    }

    function trustAddress(address _otherContract) public onlyOwner {
        trustedRemoteLookup[destChainId] = abi.encodePacked(_otherContract, address(this));   
    }
}
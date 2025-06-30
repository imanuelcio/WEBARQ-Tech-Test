// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/access/Ownable.sol";

contract StorageContract {
    address private owner;
    uint256 private value;
    
    constructor() {
        owner = msg.sender;
    }

    function storeValue(uint256 _value) public {
        require(msg.sender == owner,"hanya owner yang boleh store value");
        value = _value;
    }

    function getValue() public view returns (uint256) {
        return value;
    }

}
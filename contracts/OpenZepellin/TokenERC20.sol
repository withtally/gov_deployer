// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenERC20 is ERC20 {

    uint256 private _totalSupply;

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 _totalSupply
    ) ERC20(_name, _symbol) {
        _decimals = _decimals;
        _mint(msg.sender, _totalSupply);
    }
    
}
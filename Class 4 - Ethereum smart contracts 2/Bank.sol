// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.16;

contract Bank {
    mapping(address => uint256) public balanceOf;

    function deposit(uint256 amount) public payable {
        require(msg.value == amount);
        balanceOf[msg.sender] += amount;
    }

    function withdraw(uint256 amount) public {
        require(amount <= balanceOf[msg.sender]);
        balanceOf[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
}
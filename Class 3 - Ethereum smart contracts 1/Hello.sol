// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.16;

contract Hello {
    string public message;

    function greetMessage (string memory initialMessage) public {
        message = initialMessage;
    }

    function setMessage (string memory newMessage) public {
        message = newMessage;
    }

}
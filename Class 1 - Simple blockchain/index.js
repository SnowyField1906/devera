const Blockchain = require('./blockchain');
const Block = require('./block');

const deveraChain = new Blockchain();
console.log("mining in progress...");

 // Add block 1
const block1 = new Block(1, new Date().toString(), {
    sender: "Super Student",
    recipient: "Devera",
    quantity: 10
});
deveraChain.addNewBlock(block1);

 // Add block 2
const block2 = new Block(2, new Date().toString(), {
    sender: "Super Teacher",
    recipient: "Devera",
    quantity: 20
});
deveraChain.addNewBlock(block2);

 // Add block 3
setTimeout(function () {
    const block3 = new Block(2, new Date().toString(), {
        sender: "ABC",
        recipient: "XYZ",
        quantity: 20
    });
    deveraChain.addNewBlock(block3);
}, 6000);

// Print out the blockchain
console.log(JSON.stringify(deveraChain, null, 5))

// Check our chain for validity
console.log("validate Validity:", deveraChain.validateValidity()) 
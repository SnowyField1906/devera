const Blockchain = require('./blockchain');
const Block = require('./block');

const deveraChain = new Blockchain();
console.log("mining in progress...");

const block1 = new Block(1, "2022-09-03", {
    sender: "Super Student",
    recipient: "Devera",
    quantity: 10
});
deveraChain.addNewBlock(block1);

const block2 = new Block(2, "2022-09-04", {
    sender: "Super Teacher",
    recipient: "Devera",
    quantity: 20
});
deveraChain.addNewBlock(block2);

console.log(JSON.stringify(deveraChain, null, 5))

console.log("validate Validity:", deveraChain.validateValidity()) 
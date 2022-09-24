const bitcoin = require("bitcoinjs-lib");
const ecpair = require("ecpair");
const tinysecp = require("tiny-secp256k1");

const ECPair = ecpair.ECPairFactory(tinysecp);
const keyPair = ECPair.makeRandom();
const publicKey = keyPair.publicKey;
console.log("publicKey:", publicKey);

const { address } = bitcoin.payments.p2pkh({ pubkey: publicKey });
console.log("address:", address);

// Print your private key (in WIF format)
const privateKey = keyPair.toWIF();
console.log("privateKey:", privateKey);


tx = new bitcoin.Transaction()

// Add the input (who is paying) of the form [previous transaction hash, index of the output to use]
tx.addInput("a94ab02c182214f090e99a0d57021caffd0f195a81c24602b1028b130b63e31", 0)

// Add the output (who to pay to) of the form [payee's address, amount in satoshis]
tx.addOutput(address, 15000)

// Initialize a private key using WIF
key = bitcoin.ECKey.fromWIF(privateKey)

// Sign the first input with the new key
tx.sign(0, key)

// Print transaction serialized as hex
console.log(tx.serializeHex())
// => 0100000001313eb630b128102b60241ca895f1d0ffca2170d5a0990e094f2182c102ab94aa000000008a47304402200169f1f844936dc60df54e812345f5dd3e6681fea52e33c25154ad9cc23a330402204381ed8e73d74a95b15f312f33d5a0072c7a12dd6c3294df6e8efbe4aff27426014104e75628573696aed32d7656fb35e9c71ea08eb6492837e13d2662b9a36821d0fff992692fd14d74fdec20fae29128ba12653249cbeef521fc5eba84dde0689f27ffffffff01983a0000000000001976a914ad618cf4333b3b248f9744e8e81db2964d0ae39788ac00000000

// You could now push the transaction onto the Bitcoin network manually (see https://blockchain.info/pushtx)
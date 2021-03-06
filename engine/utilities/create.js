/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unpublished-require */
const ethers = require("ethers");
const fs = require("fs");
const wallet = ethers.Wallet.createRandom();
const util = require("util");
const encoder = new util.TextEncoder('utdf-8');

const address = wallet.address;
const privateKey = wallet.privateKey;
const mnemonic = wallet.mnemonic.phrase;

const json = {
  address,
  privateKey,
  mnemonic,
};

fs.writeFileSync("./wallet.json", JSON.stringify(json));

/*
function write() {
  fs.appendFile("wallet.json", address, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
}
write();
*/

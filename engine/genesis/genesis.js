/* eslint-disable node/no-unpublished-require */
const ethers = require("ethers");
const provider = new ethers.providers.JsonRpcProvider(
  "https://localhost:8545/"
);

const MongoClient = require("mongodb").MongoClient;
const MongoServerURL = "mongodb://localhost:27017/";
const genesisMongoClient = new MongoClient(MongoServerURL);

async function main() {
  await genesisMongoClient.connect();
  const db = genesisMongoClient.db("GenesisEthersV1");
  const collection = db.collection("LocalTransactions");
  for (let i = 0; i < 1000000; i++) {
    const block = await provider.getBlockWithTransactions(i);
    block.transactions.forEach((tx) => collection.insertOne(tx));
  }
}
main();

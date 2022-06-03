/* eslint-disable no-unused-vars */
const ethers = require("ethers");
const MongoClient = require("mongodb").MongoClient;

const provider = new ethers.providers.JsonRpcProvider(
  process.env.JsonRpcProvider
);

const MongoServerURL = process.env.MongoServerURL;
const client = new MongoClient(MongoServerURL);

const engine = async () => {
  await client.connect();
  for (let i = 0; i < 10000; i++) {
    const block = await provider.getBlockWithTransactions(i);
    const transactions = block.transactions;
    transactions.forEach(async (transaction) => {
        const database = client.db("Engine");
        const collection = database.collection("AddressList");
        collection.insertOne(transaction.from);
        console.log("Successfully inserted!");
        }
  }
};

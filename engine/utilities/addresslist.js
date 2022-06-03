/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-unused-vars */
const ethers = require("ethers");
const MongoClient = require("mongodb").MongoClient;

const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-mainnet.alchemyapi.io/v2/9dNz9mMIl8n9e8bRbfQztYeYLGXs_hUE"
);

const MURL = "mongodb://localhost:27017";
const client = new MongoClient(MURL);

const engine = async () => {
  await client.connect();
  for (let i = 100000; i < 1000000; i++) {
    const block = await provider.getBlockWithTransactions(i);
    const transactions = block.transactions;
    transactions.forEach(async (transaction) => {
      const database = client.db("Engine");
      const collection = database.collection("AddressList");
      const toaddress = transaction.to;
      const fromaddress = transaction.from;
      const doc = {
        fromaddress,
      };
      collection.updateOne(doc, { upsert: true });
      console.log(`Successfully inserted ${fromaddress}`);
    });
  }
};

engine();

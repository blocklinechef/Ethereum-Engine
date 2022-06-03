const ethers = require("ethers");
const MongoClient = require("mongodb").MongoClient;
const provider = new ethers.providers.JsonRpcProvider(
  "https://speedy-nodes-nyc.moralis.io/ebc2ab2b8b412b675dd8dcbc/bsc/mainnet/archive"
);
const MURL = "mongodb://localhost:27017";
const client = new MongoClient(MURL);
const database = client.db("Engine");
const collection = database.collection("Contracts");
const engine = async () => {
  await client.connect();
  for (let i = 18341978; i < 100000000; i++) {
    const block = await provider.getBlockWithTransactions(i);
    const transactions = block.transactions;
    transactions.forEach(async (transaction) => {
      if (transaction.creates) {
        const doc = {
          address: transaction.creates,
        };
        collection.insertOne(doc);
        console.log(transaction.creates);
      }
    });
  }
};

engine();

/* eslint-disable node/no-unpublished-require */
const ethers = require("ethers");
const provider = new ethers.providers.WebSocketProvider("ws://localhost");
const MongoClient = require("mongodb").MongoClient;
const MongoServerURL = "mongodb://localhost:27017/";
const client = new MongoClient(MongoServerURL);

const engine = async (txhash) => {
  await client.connect;
  provider.getTransaction(txhash).then(function (transaction) {
    const database = client.db("Engine");
    const transactions = database.collection("Transactions");
    if (transaction == null) {
      return;
    }
    const doc = {
      Hash: transaction.hash,
      Nonce: transaction.nonce,
    };
    transactions.insertOne(doc);
  });
};

provider.on("pending", engine);

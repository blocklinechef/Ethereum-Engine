/* eslint-disable node/no-unpublished-require */
const ethers = require("ethers");
const provider = new ethers.providers.WebSocketProvider(process.env.WebsocketProvider);
const MongoClient = require("mongodb").MongoClient;
const MongoServerURL = process.env.MongoServerURL;
const client = new MongoClient(MongoServerURL);

const engine = async (txhash) => {
  await client.connect();
  provider.getTransaction(txhash).then(function (transaction) {
    const database = client.db("Engine");
    const collection = database.collection(process.env.NAME);
    if (transaction == null) {
      return;
    }
    collection.insertOne(transaction);
  });
};

provider.on("pending", engine);

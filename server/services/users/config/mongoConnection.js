const { MongoClient } = require("mongodb");
require("dotenv").config();

// const connectionString = process.env.MONGODB || "mongodb://127.0.0.1:27017";
const connectionString = process.env.MONGODB;

const client = new MongoClient(connectionString);
let db = null;

const mongoConnect = async () => {
  try {
    await client.connect();
    const database = client.db("challenge2");

    db = database;

    return database;
  } catch (err) {
    console.log(err);
    await client.close();
  }
};

const getDatabase = () => db;

module.exports = {
  mongoConnect,
  getDatabase,
};

const { MongoClient } = require('mongodb');
require('dotenv').config();

const dbPassword = process.env.MONGO_DB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

// Parse and update the MongoDB URI
let uri = process.env.MONGODB_URI;
uri = uri.replace('<db_password>', encodeURIComponent(dbPassword));

let client;
let db;

async function connectToDatabase() {
  if (client && db) return db;

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

async function getDatabase() {
  if (!db) {
    await connectToDatabase();
  }
  return db;
}

module.exports = { connectToDatabase, getDatabase };
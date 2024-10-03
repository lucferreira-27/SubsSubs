const mongoose = require('mongoose');
require('dotenv').config();

const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB;

// Parse and update the MongoDB URI
let uri = process.env.MONGODB_URI;
uri = uri.replace('<db_password>', encodeURIComponent(dbPassword));

async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      dbName: dbName
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

module.exports = { connectToDatabase };
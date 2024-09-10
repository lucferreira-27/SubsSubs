const { getDatabase } = require('../config/database');
const { ObjectId } = require('mongodb');

const dialogsCollection = 'dialogs';

async function createDialog(dialog) {
  const db = await getDatabase();
  const collection = db.collection(dialogsCollection);
  return await collection.insertOne(dialog);
}

async function readDialogs(query = {}, limit = 0, skip = 0) {
  const db = await getDatabase();
  const collection = db.collection(dialogsCollection);
  return await collection.find(query)
    .skip(skip)
    .limit(limit)
    .toArray();
}

async function updateDialog(id, update) {
  const db = await getDatabase();
  const collection = db.collection(dialogsCollection);
  return await collection.updateOne({ _id: new ObjectId(id) }, { $set: update });
}

async function deleteDialog(id) {
  const db = await getDatabase();
  const collection = db.collection(dialogsCollection);
  return await collection.deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
  createDialog,
  readDialogs,
  updateDialog,
  deleteDialog
};
const dialogData = require('../data/dialogData');

async function createDialog(dialogInfo) {
  return await dialogData.createDialog(dialogInfo);
}

async function getDialogById(id) {
  return await dialogData.getDialogById(id);
}

async function getDialogsBySubtitleId(subtitleId) {
  return await dialogData.getDialogsBySubtitleId(subtitleId);
}

async function updateDialog(id, updateInfo) {
  return await dialogData.updateDialog(id, updateInfo);
}

async function deleteDialog(id) {
  return await dialogData.deleteDialog(id);
}

async function searchDialogs(query, page = 1, limit = 10, baseUrl) {
  // This method remains unchanged as it already contains complex logic
  // If you need to modify it, ensure to keep the business logic here
  // and use the data layer only for basic database operations
  // ... (keep the existing implementation)
}

module.exports = {
  createDialog,
  getDialogById,
  getDialogsBySubtitleId,
  updateDialog,
  deleteDialog,
  searchDialogs
};
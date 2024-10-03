const Dialog = require('../models').Dialog;

async function createDialog(dialogData) {
  const dialog = new Dialog(dialogData);
  return await dialog.save();
}

async function getDialogById(id) {
  return await Dialog.findById(id).populate('subtitleId');
}

async function getDialogsBySubtitleId(subtitleId) {
  return await Dialog.find({ subtitleId });
}

async function updateDialog(id, updateData) {
  return await Dialog.findByIdAndUpdate(id, updateData, { new: true });
}

async function deleteDialog(id) {
  return await Dialog.findByIdAndDelete(id);
}

async function searchDialogs(query, page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const searchQuery = { $text: { $search: query } };
  
  const totalResults = await Dialog.countDocuments(searchQuery);
  const dialogs = await Dialog.find(searchQuery)
    .skip(skip)
    .limit(limit)
    .populate('subtitleId');

  return {
    metadata: {
      total: totalResults,
      page: page,
      limit: limit
    },
    results: dialogs
  };
}

module.exports = {
  createDialog,
  getDialogById,
  getDialogsBySubtitleId,
  updateDialog,
  deleteDialog,
  searchDialogs
};
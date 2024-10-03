const dialogService = require('../services/dialogService');
const dialogData = require('../data/dialogData');

async function createDialog(req, res) {
  try {
    const dialog = await dialogService.createDialog(req.body);
    res.status(201).json(dialog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getDialogById(req, res) {
  try {
    const dialog = await dialogService.getDialogById(req.params.id);
    if (!dialog) {
      return res.status(404).json({ message: 'Dialog not found' });
    }
    res.json(dialog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getDialogsBySubtitleId(req, res) {
  try {
    const dialogs = await dialogService.getDialogsBySubtitleId(req.params.subtitleId);
    res.json(dialogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateDialog(req, res) {
  try {
    const updatedDialog = await dialogService.updateDialog(req.params.id, req.body);
    if (!updatedDialog) {
      return res.status(404).json({ message: 'Dialog not found' });
    }
    res.json(updatedDialog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteDialog(req, res) {
  try {
    const result = await dialogService.deleteDialog(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Dialog not found' });
    }
    res.json({ message: 'Dialog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function searchDialogs(req, res) {
  try {
    const { query, page, limit } = req.query;
    const results = await dialogData.searchDialogs(query, parseInt(page), parseInt(limit));
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createDialog,
  getDialogById,
  getDialogsBySubtitleId,
  updateDialog,
  deleteDialog,
  searchDialogs
};
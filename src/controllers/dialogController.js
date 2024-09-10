const dialogService = require('../services/dialogService');

async function createDialog(req, res) {
  try {
    const result = await dialogService.createDialog(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getDialogs(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const dialogs = await dialogService.getDialogs({}, limit, skip);
    res.json(dialogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateDialog(req, res) {
  try {
    const result = await dialogService.updateDialog(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteDialog(req, res) {
  try {
    const result = await dialogService.deleteDialog(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function searchDialogs(req, res, next) {
  try {
    const { query, page = 1, limit = 10 } = req.query;
    const baseUrl = `${req.baseUrl}${req.path}`;
    
    const result = await dialogService.searchDialogs(query, parseInt(page), parseInt(limit), baseUrl);
    
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createDialog,
  getDialogs,
  updateDialog,
  deleteDialog,
  searchDialogs  // Added this line to export the searchDialogs function
};
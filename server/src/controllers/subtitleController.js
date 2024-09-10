const subtitleService = require('../services/subtitleService');

async function createSubtitle(req, res) {
  try {
    const result = await subtitleService.createSubtitle(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating subtitle:', error);
    res.status(500).json({ error: 'An error occurred while creating the subtitle' });
  }
}

async function getSubtitles(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortOption = req.query.sort || 'episode';
    const sortOrder = req.query.order || 'asc';
    const baseUrl = `${req.baseUrl}`;

    // Parse filter parameters
    const filter = {};
    const filterFields = ['episode', 'season', 'showName', 'language', 'filler'];
    filterFields.forEach(field => {
      if (req.query[field] !== undefined) {
        filter[field] = req.query[field];
      }
    });

    const result = await subtitleService.getAllSubtitles(page, limit, sortOption, sortOrder, filter, baseUrl);

    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function updateSubtitle(req, res) {
  try {
    const result = await subtitleService.updateSubtitle(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    console.error('Error updating subtitle:', error);
    res.status(500).json({ error: 'An error occurred while updating the subtitle' });
  }
}

async function deleteSubtitle(req, res) {
  try {
    const result = await subtitleService.deleteSubtitle(req.params.id);
    res.json(result);
  } catch (error) {
    console.error('Error deleting subtitle:', error);
    res.status(500).json({ error: 'An error occurred while deleting the subtitle' });
  }
}

async function getSubtitleWithDialogs(req, res) {
  try {
    const result = await subtitleService.getSubtitleWithDialogs(req.params.id);
    if (!result) {
      res.status(404).json({ message: "Subtitle not found" });
    } else {
      res.json(result);
    }
  } catch (error) {
    console.error('Error getting subtitle with dialogs:', error);
    res.status(500).json({ error: 'An error occurred while fetching the subtitle with dialogs' });
  }
}

module.exports = {
  createSubtitle,
  getSubtitles,
  updateSubtitle,
  deleteSubtitle,
  getSubtitleWithDialogs
};
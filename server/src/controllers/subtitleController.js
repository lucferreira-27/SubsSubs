const subtitleService = require('../services/subtitleService');

async function createSubtitle(req, res) {
  try {
    const subtitle = await subtitleService.createSubtitle(req.body);
    res.status(201).json(subtitle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getSubtitleById(req, res) {
  try {
    const subtitle = await subtitleService.getSubtitleById(req.params.id);
    if (!subtitle) {
      return res.status(404).json({ message: 'Subtitle not found' });
    }
    res.json(subtitle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getSubtitlesByEpisodeId(req, res) {
  try {
    const subtitles = await subtitleService.getSubtitlesByEpisodeId(req.params.episodeId);
    res.json(subtitles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateSubtitle(req, res) {
  try {
    const updatedSubtitle = await subtitleService.updateSubtitle(req.params.id, req.body);
    if (!updatedSubtitle) {
      return res.status(404).json({ message: 'Subtitle not found' });
    }
    res.json(updatedSubtitle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteSubtitle(req, res) {
  try {
    const result = await subtitleService.deleteSubtitle(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Subtitle not found' });
    }
    res.json({ message: 'Subtitle deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createSubtitle,
  getSubtitleById,
  getSubtitlesByEpisodeId,
  updateSubtitle,
  deleteSubtitle
};
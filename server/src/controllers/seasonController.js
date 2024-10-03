const seasonService = require('../services/seasonService');

async function createSeason(req, res) {
  try {
    const season = await seasonService.createSeason(req.body);
    res.status(201).json(season);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllSeasons(req, res) {
  try {
    const seasons = await seasonService.getAllSeasons();
    res.json(seasons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getSeasonById(req, res) {
  try {
    const season = await seasonService.getSeasonById(req.params.id);
    if (!season) {
      return res.status(404).json({ message: 'Season not found' });
    }
    res.json(season);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getSeasonsByAnimeId(req, res) {
  try {
    const seasons = await seasonService.getSeasonsByAnimeId(req.params.animeId);
    res.json(seasons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateSeason(req, res) {
  try {
    const updatedSeason = await seasonService.updateSeason(req.params.id, req.body);
    if (!updatedSeason) {
      return res.status(404).json({ message: 'Season not found' });
    }
    res.json(updatedSeason);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteSeason(req, res) {
  try {
    const result = await seasonService.deleteSeason(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Season not found' });
    }
    res.json({ message: 'Season deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createSeason,
  getAllSeasons,
  getSeasonById,
  getSeasonsByAnimeId,
  updateSeason,
  deleteSeason
};
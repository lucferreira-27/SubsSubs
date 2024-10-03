const episodeService = require('../services/episodeService');

async function createEpisode(req, res) {
  try {
    const episode = await episodeService.createEpisode(req.body);
    res.status(201).json(episode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getEpisodeById(req, res) {
  try {
    const episode = await episodeService.getEpisodeById(req.params.id);
    if (!episode) {
      return res.status(404).json({ message: 'Episode not found' });
    }
    res.json(episode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getEpisodesByAnimeId(req, res) {
  try {
    const episodes = await episodeService.getEpisodesByAnimeId(req.params.animeId);
    res.json(episodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getEpisodesBySeasonId(req, res) {
  try {
    const episodes = await episodeService.getEpisodesBySeasonId(req.params.seasonId);
    res.json(episodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateEpisode(req, res) {
  try {
    const updatedEpisode = await episodeService.updateEpisode(req.params.id, req.body);
    if (!updatedEpisode) {
      return res.status(404).json({ message: 'Episode not found' });
    }
    res.json(updatedEpisode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteEpisode(req, res) {
  try {
    const result = await episodeService.deleteEpisode(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Episode not found' });
    }
    res.json({ message: 'Episode deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createEpisode,
  getEpisodeById,
  getEpisodesByAnimeId,
  getEpisodesBySeasonId,
  updateEpisode,
  deleteEpisode
};
const animeService = require('../services/animeService');

async function createAnime(req, res) {
  try {
    const anime = await animeService.createAnime(req.body);
    res.status(201).json(anime);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllAnime(req, res) {
  try {
    const animes = await animeService.getAllAnime();
    res.json(animes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAnimeById(req, res) {
  try {
    const anime = await animeService.getAnimeById(req.params.id);
    if (!anime) {
      return res.status(404).json({ message: 'Anime not found' });
    }
    res.json(anime);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateAnime(req, res) {
  try {
    const updatedAnime = await animeService.updateAnime(req.params.id, req.body);
    if (!updatedAnime) {
      return res.status(404).json({ message: 'Anime not found' });
    }
    res.json(updatedAnime);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteAnime(req, res) {
  try {
    const result = await animeService.deleteAnime(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Anime not found' });
    }
    res.json({ message: 'Anime deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createAnime,
  getAllAnime,
  getAnimeById,
  updateAnime,
  deleteAnime
};
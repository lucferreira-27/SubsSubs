const animeData = require('../data/animeData');

async function createAnime(animeInfo) {
  return await animeData.createAnime(animeInfo);
}

async function getAnimeById(id) {
  return await animeData.getAnimeById(id);
}

async function getAllAnime() {
  return await animeData.getAllAnime();
}

async function updateAnime(id, updateInfo) {
  return await animeData.updateAnime(id, updateInfo);
}

async function deleteAnime(id) {
  return await animeData.deleteAnime(id);
}

module.exports = {
  createAnime,
  getAnimeById,
  getAllAnime,
  updateAnime,
  deleteAnime
};
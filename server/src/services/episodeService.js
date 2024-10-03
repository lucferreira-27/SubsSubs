const episodeData = require('../data/episodeData');

async function createEpisode(episodeInfo) {
  return await episodeData.createEpisode(episodeInfo);
}

async function getEpisodeById(id) {
  return await episodeData.getEpisodeById(id);
}

async function getEpisodesByAnimeId(animeId) {
  return await episodeData.getEpisodesByAnimeId(animeId);
}

async function getEpisodesBySeasonId(seasonId) {
  return await episodeData.getEpisodesBySeasonId(seasonId);
}

async function updateEpisode(id, updateInfo) {
  return await episodeData.updateEpisode(id, updateInfo);
}

async function deleteEpisode(id) {
  return await episodeData.deleteEpisode(id);
}

module.exports = {
  createEpisode,
  getEpisodeById,
  getEpisodesByAnimeId,
  getEpisodesBySeasonId,
  updateEpisode,
  deleteEpisode
};
const seasonData = require('../data/seasonData');

async function createSeason(seasonInfo) {
  return await seasonData.createSeason(seasonInfo);
}
async function getAllSeasons() {
  return await seasonData.getAllSeasons();
}

async function getSeasonById(id) {
  return await seasonData.getSeasonById(id);
}

async function getSeasonsByAnimeId(animeId) {
  return await seasonData.getSeasonsByAnimeId(animeId);
}

async function updateSeason(id, updateInfo) {
  return await seasonData.updateSeason(id, updateInfo);
}

async function deleteSeason(id) {
  return await seasonData.deleteSeason(id);
}

module.exports = {
  createSeason,
  getSeasonById,
  getSeasonsByAnimeId,
  getAllSeasons,
  updateSeason,
  deleteSeason
};
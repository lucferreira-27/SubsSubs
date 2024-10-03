const Season = require('../models').Season;

async function createSeason(seasonData) {
  const season = new Season(seasonData);
  return await season.save();
}

async function getAllSeasons() {
  return await Season.find({});
}

async function getSeasonById(id) {
  return await Season.findById(id).populate('animeId');
}

async function getSeasonsByAnimeId(animeId) {
  return await Season.find({ animeId });
}

async function updateSeason(id, updateData) {
  return await Season.findByIdAndUpdate(id, updateData, { new: true });
}

async function deleteSeason(id) {
  return await Season.findByIdAndDelete(id);
}

module.exports = {
  createSeason,
  getAllSeasons,
  getSeasonById,
  getSeasonsByAnimeId,
  updateSeason,
  deleteSeason
};
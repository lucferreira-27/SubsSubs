const Episode = require('../models').Episode;

async function createEpisode(episodeData) {
  const episode = new Episode(episodeData);
  return await episode.save();
}

async function getEpisodeById(id) {
  return await Episode.findById(id).populate('anime').populate('season');
}

async function getEpisodesByAnimeId(animeId) {
  return await Episode.find({ anime: animeId }).populate('season');
}

async function getEpisodesBySeasonId(seasonId) {
  return await Episode.find({ season: seasonId });
}

async function updateEpisode(id, updateData) {
  return await Episode.findByIdAndUpdate(id, updateData, { new: true });
}

async function deleteEpisode(id) {
  return await Episode.findByIdAndDelete(id);
}

module.exports = {
  createEpisode,
  getEpisodeById,
  getEpisodesByAnimeId,
  getEpisodesBySeasonId,
  updateEpisode,
  deleteEpisode
};
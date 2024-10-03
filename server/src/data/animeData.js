const Anime = require('../models').Anime;

async function createAnime(animeData) {
  const anime = new Anime(animeData);
  return await anime.save();
}

async function getAnimeById(id) {
  return await Anime.findById(id).populate('seasons').populate('episodes');
}

async function getAllAnime() {
  return await Anime.find().populate('seasons');
}

async function updateAnime(id, updateData) {
  return await Anime.findByIdAndUpdate(id, updateData, { new: true });
}

async function deleteAnime(id) {
  return await Anime.findByIdAndDelete(id);
}

module.exports = {
  createAnime,
  getAnimeById,
  getAllAnime,
  updateAnime,
  deleteAnime
};
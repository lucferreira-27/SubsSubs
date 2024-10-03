const Subtitle = require('../models').Subtitle;

async function createSubtitle(subtitleData) {
  const subtitle = new Subtitle(subtitleData);
  return await subtitle.save();
}

async function getSubtitleById(id) {
  return await Subtitle.findById(id).populate('dialogs');
}

async function getSubtitlesByEpisodeId(episodeId) {
  return await Subtitle.find({ episodeId }).populate('dialogs');
}

async function updateSubtitle(id, updateData) {
  return await Subtitle.findByIdAndUpdate(id, updateData, { new: true });
}

async function deleteSubtitle(id) {
  return await Subtitle.findByIdAndDelete(id);
}

module.exports = {
  createSubtitle,
  getSubtitleById,
  getSubtitlesByEpisodeId,
  updateSubtitle,
  deleteSubtitle
};
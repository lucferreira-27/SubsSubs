const subtitleData = require('../data/subtitleData');

async function createSubtitle(subtitleInfo) {
  return await subtitleData.createSubtitle(subtitleInfo);
}

async function getSubtitleById(id) {
  return await subtitleData.getSubtitleById(id);
}

async function getSubtitlesByEpisodeId(episodeId) {
  return await subtitleData.getSubtitlesByEpisodeId(episodeId);
}

async function updateSubtitle(id, updateInfo) {
  return await subtitleData.updateSubtitle(id, updateInfo);
}

async function deleteSubtitle(id) {
  return await subtitleData.deleteSubtitle(id);
}

module.exports = {
  createSubtitle,
  getSubtitleById,
  getSubtitlesByEpisodeId,
  updateSubtitle,
  deleteSubtitle
};
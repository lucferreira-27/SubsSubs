const subtitleData = require('../data/subtitleData');
const dialogData = require('../data/dialogData');
const { ObjectId } = require('mongodb');
const Subtitle = require('../models/subtitle');

async function createSubtitle(subtitleInfo) {
  try {
    return await subtitleData.createSubtitle(subtitleInfo);
  } catch (error) {
    console.error('Error in createSubtitle service:', error);
    throw new Error('Failed to create subtitle');
  }
}

async function getSubtitles(page, limit) {
  try {
    const parsedPage = parseInt(page, 10) || 1;
    const parsedLimit = parseInt(limit, 10) || 10;
    const skip = (parsedPage - 1) * parsedLimit;
    const subtitles = await subtitleData.readSubtitles({}, parsedLimit, skip, {});

    return subtitles.map(({dialogs, ...subtitle}) => ({
      ...subtitle,
      dialogCount: dialogs?.length || 0
    }));
  } catch (error) {
    console.error('Error in getSubtitles service:', error);
    throw new Error('Failed to fetch subtitles');
  }
}

async function updateSubtitle(id, update) {
  try {
    return await subtitleData.updateSubtitle(id, update);
  } catch (error) {
    console.error('Error in updateSubtitle service:', error);
    throw new Error('Failed to update subtitle');
  }
}

async function deleteSubtitle(id) {
  try {
    return await subtitleData.deleteSubtitle(id);
  } catch (error) {
    console.error('Error in deleteSubtitle service:', error);
    throw new Error('Failed to delete subtitle');
  }
}

async function getSubtitleWithDialogs(subtitleId) {
  try {
    const subtitle = await subtitleData.findSubtitle(subtitleId);
    if (!subtitle) return null;
    // ObjectId is deprecated
    const dialogs = await dialogData.readDialogs({ subtitleId: new ObjectId(subtitleId) });
    subtitle.dialogs = dialogs.map(({subtitleId, ...dialog}) => ({
      ...dialog,
    }));

    return subtitle;
  } catch (error) {
    console.error('Error in getSubtitleWithDialogs service:', error);
    throw new Error('Failed to fetch subtitle with dialogs');
  }
}

async function countSubtitles(query) {
  try {
    return await subtitleData.countSubtitles(query);
  } catch (error) {
    console.error('Error in countSubtitles service:', error);
    throw new Error('Failed to count subtitles');
  }
}

function buildPageUrl(baseUrl, page, limit, sortOption, sortOrder, filter) {
  let url = `${baseUrl}?page=${page}&limit=${limit}&sort=${sortOption}&order=${sortOrder}`;
  for (const [key, value] of Object.entries(filter)) {
    if (value !== undefined) {
      url += `&${key}=${encodeURIComponent(value)}`;
    }
  }
  return url;
}

async function getAllSubtitles(page = 1, limit = 10, sortOption = 'episode', sortOrder = 'asc', filter = {}, baseUrl) {
  try {
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);

    const result = await subtitleData.readSortedSubtitles(filter, parsedPage, parsedLimit, sortOption, sortOrder);

    if (!result || !result.results) {
      return { metadata: {}, results: [] };
    }

    const metadata = result.metadata[0] || {
      totalResults: 0,
      currentPage: parsedPage,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false
    };

    return {
      metadata: {
        ...metadata,
        nextPage: metadata.hasNextPage ? buildPageUrl(baseUrl, parsedPage + 1, parsedLimit, sortOption, sortOrder, filter) : null,
        prevPage: metadata.hasPrevPage ? buildPageUrl(baseUrl, parsedPage - 1, parsedLimit, sortOption, sortOrder, filter) : null
      },
      results: result.results.map(({dialogs, ...subtitle}) => ({
        ...subtitle,
        dialogCount: dialogs?.length || 0
      }))
    };
  } catch (error) {
    console.error('Error in getAllSubtitles service:', error);
    throw new Error('Failed to fetch sorted subtitles');
  }
}

module.exports = {
  createSubtitle,
  getSubtitles,
  updateSubtitle,
  deleteSubtitle,
  getSubtitleWithDialogs,
  countSubtitles,
  getAllSubtitles,
  buildPageUrl
};
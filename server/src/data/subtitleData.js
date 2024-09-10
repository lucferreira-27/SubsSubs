const { getDatabase } = require('../config/database');
const { ObjectId } = require('mongodb');
const Subtitle = require('../models/subtitle');
const subtitlesCollection = process.env.MONGODB_COLLECTION_NAME;

async function createSubtitle(subtitle) {
  const db = await getDatabase();
  const collection = db.collection(subtitlesCollection);
  return await collection.insertOne(subtitle);
}

async function readSubtitles(query = {}, limit = 0, skip = 0, projection = {}) {
  const db = await getDatabase();
  const collection = db.collection(subtitlesCollection);
  return await collection.find(query)
    .project(projection)
    .skip(skip)
    .limit(limit)
    .toArray();
}

async function updateSubtitle(id, update) {
  const db = await getDatabase();
  const collection = db.collection(subtitlesCollection);
  return await collection.updateOne({ _id: new ObjectId(id) }, { $set: update });
}

async function deleteSubtitle(id) {
  const db = await getDatabase();
  const collection = db.collection(subtitlesCollection);
  return await collection.deleteOne({ _id: new ObjectId(id) });
}

async function countSubtitles(query = {}) {
  const db = await getDatabase();
  const collection = db.collection(subtitlesCollection);
  return await collection.countDocuments(query);
}

async function findSubtitle(id) {
  const db = await getDatabase();
  const collection = db.collection(subtitlesCollection);
  return await collection.findOne({ _id: new ObjectId(id) });
}

async function readSortedSubtitles(filter = {}, page = 1, limit = 10, sortOption = 'episode', sortOrder = 'asc') {
  try {
    const db = await getDatabase();
    const collection = db.collection(subtitlesCollection);
    const skip = (page - 1) * limit;
    const sortDirection = sortOrder === 'desc' ? -1 : 1;
    const sortCriteria = {};
    
    if (sortOption === 'episode') {
      sortCriteria['episode'] = sortDirection;
      sortCriteria['filename'] = 1; // Secondary sort by filename
    } else {
      sortCriteria[sortOption] = sortDirection;
    }

    // Convert episode and season to numbers if present in the filter
    if (filter.episode) filter.episode = parseInt(filter.episode);
    if (filter.season) filter.season = parseInt(filter.season);

    // Handle filler filter
    if (filter.filler !== undefined) {
      filter.filler = filter.filler === 'true';
    }

    const pipeline = [
      { $match: filter },
      { $sort: sortCriteria },
      {
        $facet: {
          metadata: [
            { $count: "totalResults" },
            {
              $addFields: {
                currentPage: page,
                totalPages: { $ceil: { $divide: ["$totalResults", limit] } },
                hasNextPage: { $lt: [{ $multiply: [page, limit] }, "$totalResults"] },
                hasPrevPage: { $gt: [page, 1] }
              }
            }
          ],
          results: [
            { $skip: skip },
            { $limit: limit }
          ]
        }
      }
    ];

    const [result] = await collection.aggregate(pipeline).toArray();
    return result;
  } catch (error) {
    console.error('Error in readSortedSubtitles:', error);
    throw error;
  }
}

module.exports = {
  createSubtitle,
  readSubtitles,
  updateSubtitle,
  deleteSubtitle,
  countSubtitles,
  findSubtitle,
  readSortedSubtitles
};
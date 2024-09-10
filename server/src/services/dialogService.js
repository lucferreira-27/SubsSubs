const dialogData = require('../data/dialogData');
const { getDatabase } = require('../config/database');
const { ObjectId } = require('mongodb');

async function createDialog(dialogInfo) {
  return await dialogData.createDialog(dialogInfo);
}

async function getDialogs(query, limit, skip) {
  return await dialogData.readDialogs(query, limit, skip);
}

async function updateDialog(id, update) {
  return await dialogData.updateDialog(id, update);
}

async function deleteDialog(id) {
  return await dialogData.deleteDialog(id);
}

async function searchDialogs(query, page = 1, limit = 10, baseUrl) {
  try {
    const db = await getDatabase();
    const skip = (page - 1) * limit;

    const pipeline = [
      // Match dialogs based on the query
      { $match: { text: { $regex: query, $options: 'i' } } },
      
      // Group matching dialogs by subtitle
      {
        $group: {
          _id: "$subtitleId",
          dialogs: {
            $push: {
              _id: "$_id",
              text: "$text",
              startTime: "$startTime",
              endTime: "$endTime"
            }
          },
          count: { $sum: 1 }
        }
      },
      
      // Lookup subtitle information
      {
        $lookup: {
          from: "subtitles",
          localField: "_id",
          foreignField: "_id",
          as: "subtitleInfo"
        }
      },
      { $unwind: "$subtitleInfo" },
      
      // Project the final structure
      {
        $project: {
          _id: "$subtitleInfo._id",
          episode: "$subtitleInfo.episode",
          filename: "$subtitleInfo.filename",
          dialogs: 1,
          matchCount: "$count"
        }
      },
      
      // Sort by the number of matches (optional)
      { $sort: { matchCount: -1 } },
      
      // Facet for pagination
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

    const [result] = await db.collection('dialogs').aggregate(pipeline).toArray();
    
    const metadata = result.metadata[0] || {
      totalResults: 0,
      currentPage: page,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false
    };

    const buildPageUrl = (pageNum) => {
      // use alternative method without new URL
      return `${baseUrl}?query=${query}&page=${pageNum}&limit=${limit}`;
    };

    return {
      metadata: {
        ...metadata,
        nextPage: metadata.hasNextPage ? buildPageUrl(page + 1) : null,
        prevPage: metadata.hasPrevPage ? buildPageUrl(page - 1) : null
      },
      results: result.results
    };
  } catch (error) {
    console.error(error.stack);
    throw new Error(`Error searching dialogs: ${error.message}`);
  }
}

module.exports = {
  createDialog,
  getDialogs,
  updateDialog,
  deleteDialog,
  searchDialogs
};
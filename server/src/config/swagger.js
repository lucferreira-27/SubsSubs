const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Anime Subtitle API',
      version: '1.0.0',
      description: 'API for managing anime, seasons, episodes, and subtitles',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Anime: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            slug: { type: 'string' },
            episodeCount: { type: 'integer' },
            images: { type: 'object' },
            seasons: { 
              type: 'array',
              items: { type: 'string' }
            },
            episodes: {
              type: 'array',
              items: { type: 'string' }
            }
          },
        },
        Season: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            seasonNumber: { type: 'integer' },
            numberOfEpisodes: { type: 'integer' },
            animeId: { type: 'string' }
          },
        },
        Episode: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            slug_title: { type: 'string' },
            description: { type: 'string' },
            images: { type: 'object' },
            anime: { type: 'string' },
            season: { type: 'string' },
            episodeNumber: { type: 'integer' }
          },
        },
        Subtitle: {
          type: 'object',
          properties: {
            episodeId: { type: 'string' },
            episodeTitle: { type: 'string' },
            language: { type: 'string' },
            seasonId: { type: 'string' },
            dialogs: {
              type: 'array',
              items: { type: 'string' }
            }
          },
        },
        Dialog: {
          type: 'object',
          properties: {
            subtitleId: { type: 'string' },
            start: { type: 'string' },
            end: { type: 'string' },
            text: { type: 'string' }
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

module.exports = specs;
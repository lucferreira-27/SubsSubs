const request = require('supertest');
const mongoose = require('mongoose');
const { app, connectToDatabase } = require('../app');
const { Season, Anime, Episode, Subtitle, Dialog } = require('../models');

describe('Season Controller', () => {
  let testAnime;
  let testSeason;

  beforeAll(async () => {
    await connectToDatabase();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Anime.deleteMany({});
    await Season.deleteMany({});
    await Episode.deleteMany({});
    await Subtitle.deleteMany({});
    await Dialog.deleteMany({});

    testAnime = await Anime.create({
      id: `Anime${new mongoose.Types.ObjectId().toString()}`,
      name: 'Test Anime',
      description: 'This is a test anime',
      slug: `test-anime-${Date.now()}`,
      episodeCount: 12
    });

    testSeason = await Season.create({
      id: `Season${new mongoose.Types.ObjectId().toString()}`,
      title: 'Test Season',
      seasonNumber: 1,
      numberOfEpisodes: 12,
      animeId: testAnime._id
    });
  });

  describe('POST /api/seasons', () => {
    it('should create a new season', async () => {
      const res = await request(app)
        .post('/api/seasons')
        .send({
          id: `Season${new mongoose.Types.ObjectId().toString()}`,
          title: 'New Season',
          seasonNumber: 2,
          numberOfEpisodes: 12,
          animeId: testAnime._id
        });
      
      if (res.statusCode !== 201) {
        console.error('Error response:', res.body);
      }
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('title', 'New Season');
    });
  });

  describe('GET /api/seasons', () => {
    it('should get all seasons', async () => {
      const res = await request(app).get('/api/seasons');
      
      if (res.statusCode !== 200) {
        console.error('Error response:', res.body);
      }
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toEqual(1);
    });
  });

  describe('GET /api/seasons/:id', () => {
    it('should get a specific season', async () => {
      const res = await request(app).get(`/api/seasons/${testSeason._id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('title', 'Test Season');
    });

    it('should return 404 for non-existent season', async () => {
      const res = await request(app).get('/api/seasons/5f7d0f3ce6b53c1f4c3f1234');
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('GET /api/seasons/anime/:animeId', () => {
    it('should get seasons for a specific anime', async () => {
      const res = await request(app).get(`/api/seasons/anime/${testAnime._id}`);
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toEqual(1);
    });
  });

  describe('PUT /api/seasons/:id', () => {
    it('should update a season', async () => {
      const res = await request(app)
        .put(`/api/seasons/${testSeason._id}`)
        .send({
          title: 'Updated Season'
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('title', 'Updated Season');
    });
  });

  describe('DELETE /api/seasons/:id', () => {
    it('should delete a season', async () => {
      const res = await request(app).delete(`/api/seasons/${testSeason._id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Season deleted successfully');
    });
  });
});
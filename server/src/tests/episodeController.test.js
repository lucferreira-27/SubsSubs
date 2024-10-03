const request = require('supertest');
const mongoose = require('mongoose');
const { app, connectToDatabase } = require('../app');
const { Episode, Anime, Season, Subtitle, Dialog } = require('../models');

describe('Episode Controller', () => {
  let testAnime;
  let testSeason;
  let testEpisode;

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

    testEpisode = await Episode.create({
      id: `Episode${new mongoose.Types.ObjectId().toString()}`,
      title: 'Test Episode',
      slug_title: `test-episode-${Date.now()}`,
      description: 'This is a test episode',
      anime: testAnime._id,
      season: testSeason._id,
      episodeNumber: 1
    });
  });

  describe('POST /api/episodes', () => {
    it('should create a new episode', async () => {
      const res = await request(app)
        .post('/api/episodes')
        .send({
          id: `Episode${new mongoose.Types.ObjectId().toString()}`,
          title: 'New Episode',
          slug_title: `new-episode-${Date.now()}`,
          description: 'This is a new episode',
          anime: testAnime._id,
          season: testSeason._id,
          episodeNumber: 2
        });
      
      if (res.statusCode !== 201) {
        console.error('Error response:', res.body);
      }
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('title', 'New Episode');
    });
  });

  describe('GET /api/episodes/:id', () => {
    it('should get a specific episode', async () => {
      const res = await request(app).get(`/api/episodes/${testEpisode._id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('title', 'Test Episode');
    });

    it('should return 404 for non-existent episode', async () => {
      const res = await request(app).get('/api/episodes/5f7d0f3ce6b53c1f4c3f1234');
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('GET /api/episodes/anime/:animeId', () => {
    it('should get episodes for a specific anime', async () => {
      const res = await request(app).get(`/api/episodes/anime/${testAnime._id}`);
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toEqual(1);
    });
  });

  describe('GET /api/episodes/season/:seasonId', () => {
    it('should get episodes for a specific season', async () => {
      const res = await request(app).get(`/api/episodes/season/${testSeason._id}`);
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toEqual(1);
    });
  });

  describe('PUT /api/episodes/:id', () => {
    it('should update an episode', async () => {
      const res = await request(app)
        .put(`/api/episodes/${testEpisode._id}`)
        .send({
          title: 'Updated Episode'
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('title', 'Updated Episode');
    });
  });

  describe('DELETE /api/episodes/:id', () => {
    it('should delete an episode', async () => {
      const res = await request(app).delete(`/api/episodes/${testEpisode._id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Episode deleted successfully');
    });
  });
});
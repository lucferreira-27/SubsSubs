const request = require('supertest');
const mongoose = require('mongoose');
const { app, connectToDatabase } = require('../app');
const { Dialog, Subtitle, Anime, Season, Episode } = require('../models');

describe('Dialog Controller', () => {
  let testSubtitle;
  let testDialog;

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

    const testAnime = await Anime.create({
      id: `Anime${new mongoose.Types.ObjectId().toString()}`,
      name: 'Test Anime',
      slug: `test-anime-${Date.now()}`,
      episodeCount: 12
    });

    const testSeason = await Season.create({
      id: `Season${new mongoose.Types.ObjectId().toString()}`,
      title: 'Test Season',
      seasonNumber: 1,
      numberOfEpisodes: 12,
      animeId: testAnime._id
    });

    const testEpisode = await Episode.create({
      id: `Episode${new mongoose.Types.ObjectId().toString()}`,
      title: 'Test Episode',
      slug_title: `test-episode-${Date.now()}`,
      description: 'This is a test episode',
      episodeNumber: 1,
      anime: testAnime._id,
      season: testSeason._id
    });

    testSubtitle = await Subtitle.create({
      id: `Subtitle${new mongoose.Types.ObjectId().toString()}`, // Add this line
      episodeId: testEpisode._id,
      episodeTitle: 'Test Episode',
      language: 'en',
      seasonId: testSeason._id
    });

    testDialog = await Dialog.create({
      id: `Dialog${new mongoose.Types.ObjectId().toString()}`,
      subtitleId: testSubtitle._id,
      start: '00:00:01,000',
      end: '00:00:05,000',
      text: 'This is a test dialog'
    });
  });

  describe('POST /api/dialogs', () => {
    it('should create a new dialog', async () => {
      const res = await request(app)
        .post('/api/dialogs')
        .send({
          id: `Dialog${new mongoose.Types.ObjectId().toString()}`,
          subtitleId: testSubtitle._id,
          start: '00:00:06,000',
          end: '00:00:10,000',
          text: 'This is a new dialog'
        });
      
      if (res.statusCode !== 201) {
        console.error('Error response:', res.body);
      }
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('text', 'This is a new dialog');
    });
  });

  describe('GET /api/dialogs/:id', () => {
    it('should get a specific dialog', async () => {
      const res = await request(app).get(`/api/dialogs/${testDialog._id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('text', 'This is a test dialog');
    });

    it('should return 404 for non-existent dialog', async () => {
      const res = await request(app).get('/api/dialogs/5f7d0f3ce6b53c1f4c3f1234');
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('GET /api/dialogs/subtitle/:subtitleId', () => {
    it('should get dialogs for a specific subtitle', async () => {
      const res = await request(app).get(`/api/dialogs/subtitle/${testSubtitle._id}`);
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toEqual(1);
    });
  });

  describe('PUT /api/dialogs/:id', () => {
    it('should update a dialog', async () => {
      const res = await request(app)
        .put(`/api/dialogs/${testDialog._id}`)
        .send({
          text: 'This is an updated dialog'
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('text', 'This is an updated dialog');
    });
  });

  describe('DELETE /api/dialogs/:id', () => {
    it('should delete a dialog', async () => {
      const res = await request(app).delete(`/api/dialogs/${testDialog._id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Dialog deleted successfully');
    });
  });

  describe('GET /api/dialogs/search-dialogs', () => {
    it('should search for dialogs', async () => {
      const res = await request(app)
        .get('/api/dialogs/search-dialogs')
        .query({ query: 'test', page: 1, limit: 10 });
      
      if (res.statusCode !== 200) {
        console.error('Error response:', res.body);
      }
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('metadata');
      expect(res.body).toHaveProperty('results');
    });
  });
});
const request = require('supertest');
const mongoose = require('mongoose');
const { app, connectToDatabase } = require('../app');
const { Subtitle, Episode, Anime, Season, Dialog } = require('../models');

describe('Subtitle Controller', () => {
  let testEpisode;
  let testSubtitle;

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

    testEpisode = await Episode.create({
      id: `Episode${new mongoose.Types.ObjectId().toString()}`,
      title: 'Test Episode',
      slug_title: `test-episode-${Date.now()}`,
      description: 'This is a test episode',
      episodeNumber: 1,
      anime: testAnime._id,
      season: testSeason._id
    });

    testSubtitle = await Subtitle.create({
      id: `Subtitle${new mongoose.Types.ObjectId().toString()}`,
      episodeId: testEpisode._id,
      episodeTitle: 'Test Episode',
      language: 'en',
      seasonId: testSeason._id,
      content: { /* Add some sample content */ }
    });
  });

  describe('POST /api/subtitles', () => {
    it('should create a new subtitle', async () => {
      const res = await request(app)
        .post('/api/subtitles')
        .send({
          id: `Subtitle${new mongoose.Types.ObjectId().toString()}`,
          episodeId: testEpisode._id,
          episodeTitle: 'Test Episode',
          language: 'fr',
          seasonId: testEpisode.season, // Add this line
          content: { 
           dialogs: [
             {
               subtitleId: testSubtitle._id,
               start: '00:00:01,000',
               end: '00:00:03,000',
               text: 'Hello, world!'
             },
             {
               subtitleId: testSubtitle._id,
               start: '00:00:04,000',
               end: '00:00:06,000',
               text: 'This is a test subtitle.'
             }
           ]
           }
        });
      
      if (res.statusCode !== 201) {
        console.error('Error response:', res.body);
      }
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('language', 'fr');
    });
  });

  describe('GET /api/subtitles/:id', () => {
    it('should get a specific subtitle', async () => {
      const res = await request(app).get(`/api/subtitles/${testSubtitle._id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('language', 'en');
    });

    it('should return 404 for non-existent subtitle', async () => {
      const res = await request(app).get('/api/subtitles/5f7d0f3ce6b53c1f4c3f1234');
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('GET /api/subtitles/episode/:episodeId', () => {
    it('should get subtitles for a specific episode', async () => {
      const res = await request(app).get(`/api/subtitles/episode/${testEpisode._id}`);
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toEqual(1);
    });
  });

  describe('PUT /api/subtitles/:id', () => {
    it('should update a subtitle', async () => {
      const res = await request(app)
        .put(`/api/subtitles/${testSubtitle._id}`)
        .send({
          language: 'es'
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('language', 'es');
    });
  });

  describe('DELETE /api/subtitles/:id', () => {
    it('should delete a subtitle', async () => {
      const res = await request(app).delete(`/api/subtitles/${testSubtitle._id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Subtitle deleted successfully');
    });
  });
});
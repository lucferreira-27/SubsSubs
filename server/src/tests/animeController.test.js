const request = require('supertest');
const mongoose = require('mongoose');
const { app, connectToDatabase } = require('../app');
const { Anime } = require('../models/index');

describe('Anime Controller', () => {
  let testAnime;

  beforeAll(async () => {
    await connectToDatabase();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Anime.deleteMany({});
    testAnime = await Anime.create({
      id: `Anime${new mongoose.Types.ObjectId().toString()}`,
      name: 'Test Anime',
      description: 'This is a test anime',
      slug: `test-anime-${Date.now()}`,
      episodeCount: 12
    });
  });

  describe('POST /api/anime', () => {
    it('should create a new anime', async () => {
      const res = await request(app)
        .post('/api/anime')
        .send({
          name: 'New Anime',
          description: 'This is a new anime',
          slug: 'new-anime',
          episodeCount: 24,
          id: `NewAnime{${Math.random().toString(36).substring(2, 15)}}`
        });
      
      if (res.statusCode !== 201) {
        console.error('Error response:', res.body);
      }
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('name', 'New Anime');
    });
  });

  describe('GET /api/anime', () => {
    it('should get all anime', async () => {
      const res = await request(app).get('/api/anime');
      
      if (res.statusCode !== 200) {
        console.error('Error response:', res.body);
      }
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toEqual(1);
    });
  });

  describe('GET /api/anime/:id', () => {
    let testAnime;

    beforeEach(async () => {
      // Create a test anime specifically for this describe block
      testAnime = await Anime.create({
        id: `Anime${new mongoose.Types.ObjectId().toString()}`,
        name: 'Test Anime for GET',
        description: 'This is a test anime for GET request',
        slug: `test-anime-get-${Date.now()}`,
        episodeCount: 12
      });
    });

    it('should get a specific anime', async () => {
      console.log(testAnime._id);
      const res = await request(app).get(`/api/anime/${testAnime._id}`);
      
      if (res.statusCode !== 200) {
        console.error('Error response:', res.body);

      }
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('name', 'Test Anime for GET');
    });

    it('should return 404 for non-existent anime', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/anime/${fakeId}`);
      
      if (res.statusCode !== 404) {
        console.error('Unexpected response:', res.body);
      }
      
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('PUT /api/anime/:id', () => {
    it('should update an anime', async () => {
      const res = await request(app)
        .put(`/api/anime/${testAnime._id}`)
        .send({
          name: 'Updated Anime'
        });
      
      if (res.statusCode !== 200) {
        console.error('Error response:', res.body);
      }
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('name', 'Updated Anime');
    });
  });

  describe('DELETE /api/anime/:id', () => {
    it('should delete an anime', async () => {
      const res = await request(app).delete(`/api/anime/${testAnime._id}`);
      
      if (res.statusCode !== 200) {
        console.error('Error response:', res.body);
      }
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Anime deleted successfully');
    });
  });
});
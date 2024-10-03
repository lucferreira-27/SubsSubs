const express = require('express');
const router = express.Router();
const animeController = require('../controllers/animeController');

/**
 * @swagger
 * /api/anime:
 *   post:
 *     summary: Create a new anime
 *     tags: [Anime]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Anime'
 *     responses:
 *       201:
 *         description: Created anime
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Anime'
 *       500:
 *         description: Server error
 */
router.post('/', animeController.createAnime);

/**
 * @swagger
 * /api/anime:
 *   get:
 *     summary: Get all anime
 *     tags: [Anime]
 *     responses:
 *       200:
 *         description: List of anime
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Anime'
 *       500:
 *         description: Server error
 */
router.get('/', animeController.getAllAnime);

/**
 * @swagger
 * /api/anime/{id}:
 *   get:
 *     summary: Get an anime by ID
 *     tags: [Anime]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An anime object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Anime'
 *       404:
 *         description: Anime not found
 *       500:
 *         description: Server error
 */
router.get('/:id', animeController.getAnimeById);

/**
 * @swagger
 * /api/anime/{id}:
 *   put:
 *     summary: Update an anime
 *     tags: [Anime]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Anime'
 *     responses:
 *       200:
 *         description: Updated anime
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Anime'
 *       404:
 *         description: Anime not found
 *       500:
 *         description: Server error
 */
router.put('/:id', animeController.updateAnime);

/**
 * @swagger
 * /api/anime/{id}:
 *   delete:
 *     summary: Delete an anime
 *     tags: [Anime]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Anime deleted successfully
 *       404:
 *         description: Anime not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', animeController.deleteAnime);

module.exports = router;
const express = require('express');
const router = express.Router();
const seasonController = require('../controllers/seasonController');

/**
 * @swagger
 * /api/seasons:
 *   post:
 *     summary: Create a new season
 *     tags: [Seasons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Season'
 *     responses:
 *       201:
 *         description: Created season
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Season'
 *       500:
 *         description: Server error
 */
router.post('/', seasonController.createSeason);

/**
 * @swagger
 * /api/seasons:
 *   get:
 *     summary: Get all seasons
 *     tags: [Seasons]
 *     responses:
 *       200:
 *         description: List of seasons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Season'
 *       500:
 *         description: Server error
 */
router.get('/', seasonController.getAllSeasons);

/**
 * @swagger
 * /api/seasons/{id}:
 *   get:
 *     summary: Get a season by ID
 *     tags: [Seasons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A season object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Season'
 *       404:
 *         description: Season not found
 *       500:
 *         description: Server error
 */
router.get('/:id', seasonController.getSeasonById);

/**
 * @swagger
 * /api/seasons/anime/{animeId}:
 *   get:
 *     summary: Get seasons by anime ID
 *     tags: [Seasons]
 *     parameters:
 *       - in: path
 *         name: animeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of seasons for the specified anime
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Season'
 *       500:
 *         description: Server error
 */
router.get('/anime/:animeId', seasonController.getSeasonsByAnimeId);

/**
 * @swagger
 * /api/seasons/{id}:
 *   put:
 *     summary: Update a season
 *     tags: [Seasons]
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
 *             $ref: '#/components/schemas/Season'
 *     responses:
 *       200:
 *         description: Updated season
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Season'
 *       404:
 *         description: Season not found
 *       500:
 *         description: Server error
 */
router.put('/:id', seasonController.updateSeason);

/**
 * @swagger
 * /api/seasons/{id}:
 *   delete:
 *     summary: Delete a season
 *     tags: [Seasons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Season deleted successfully
 *       404:
 *         description: Season not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', seasonController.deleteSeason);

module.exports = router;
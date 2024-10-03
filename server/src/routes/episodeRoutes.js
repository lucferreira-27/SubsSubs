const express = require('express');
const router = express.Router();
const episodeController = require('../controllers/episodeController');

/**
 * @swagger
 * /api/episodes:
 *   post:
 *     summary: Create a new episode
 *     tags: [Episodes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Episode'
 *     responses:
 *       201:
 *         description: Created episode
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Episode'
 *       500:
 *         description: Server error
 */
router.post('/', episodeController.createEpisode);

/**
 * @swagger
 * /api/episodes/{id}:
 *   get:
 *     summary: Get an episode by ID
 *     tags: [Episodes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An episode object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Episode'
 *       404:
 *         description: Episode not found
 *       500:
 *         description: Server error
 */
router.get('/:id', episodeController.getEpisodeById);

/**
 * @swagger
 * /api/episodes/anime/{animeId}:
 *   get:
 *     summary: Get episodes by anime ID
 *     tags: [Episodes]
 *     parameters:
 *       - in: path
 *         name: animeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of episodes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Episode'
 *       500:
 *         description: Server error
 */
router.get('/anime/:animeId', episodeController.getEpisodesByAnimeId);

/**
 * @swagger
 * /api/episodes/season/{seasonId}:
 *   get:
 *     summary: Get episodes by season ID
 *     tags: [Episodes]
 *     parameters:
 *       - in: path
 *         name: seasonId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of episodes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Episode'
 *       500:
 *         description: Server error
 */
router.get('/season/:seasonId', episodeController.getEpisodesBySeasonId);

/**
 * @swagger
 * /api/episodes/{id}:
 *   put:
 *     summary: Update an episode
 *     tags: [Episodes]
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
 *             $ref: '#/components/schemas/Episode'
 *     responses:
 *       200:
 *         description: Updated episode
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Episode'
 *       404:
 *         description: Episode not found
 *       500:
 *         description: Server error
 */
router.put('/:id', episodeController.updateEpisode);

/**
 * @swagger
 * /api/episodes/{id}:
 *   delete:
 *     summary: Delete an episode
 *     tags: [Episodes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Episode deleted successfully
 *       404:
 *         description: Episode not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', episodeController.deleteEpisode);

module.exports = router;
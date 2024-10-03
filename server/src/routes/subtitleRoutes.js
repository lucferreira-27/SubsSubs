const express = require('express');
const router = express.Router();
const subtitleController = require('../controllers/subtitleController');

/**
 * @swagger
 * /api/subtitles:
 *   post:
 *     summary: Create a new subtitle
 *     tags: [Subtitles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subtitle'
 *     responses:
 *       201:
 *         description: Created subtitle
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subtitle'
 *       500:
 *         description: Server error
 */
router.post('/', subtitleController.createSubtitle);

/**
 * @swagger
 * /api/subtitles/{id}:
 *   get:
 *     summary: Get a subtitle by ID
 *     tags: [Subtitles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A subtitle object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subtitle'
 *       404:
 *         description: Subtitle not found
 *       500:
 *         description: Server error
 */
router.get('/:id', subtitleController.getSubtitleById);

/**
 * @swagger
 * /api/subtitles/episode/{episodeId}:
 *   get:
 *     summary: Get subtitles by episode ID
 *     tags: [Subtitles]
 *     parameters:
 *       - in: path
 *         name: episodeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of subtitles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subtitle'
 *       500:
 *         description: Server error
 */
router.get('/episode/:episodeId', subtitleController.getSubtitlesByEpisodeId);

/**
 * @swagger
 * /api/subtitles/{id}:
 *   put:
 *     summary: Update a subtitle
 *     tags: [Subtitles]
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
 *             $ref: '#/components/schemas/Subtitle'
 *     responses:
 *       200:
 *         description: Updated subtitle
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subtitle'
 *       404:
 *         description: Subtitle not found
 *       500:
 *         description: Server error
 */
router.put('/:id', subtitleController.updateSubtitle);

/**
 * @swagger
 * /api/subtitles/{id}:
 *   delete:
 *     summary: Delete a subtitle
 *     tags: [Subtitles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subtitle deleted successfully
 *       404:
 *         description: Subtitle not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', subtitleController.deleteSubtitle);

module.exports = router;
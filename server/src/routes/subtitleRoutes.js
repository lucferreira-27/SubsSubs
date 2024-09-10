const express = require('express');
const router = express.Router();
const subtitleController = require('../controllers/subtitleController');
const { createSubtitleLimiter } = require('../middleware/rateLimiter');
const { validateSubtitle } = require('../middleware/inputValidation');
const { readSubtitles, countSubtitles } = require('../data/subtitleData');

/**
 * @swagger
 * components:
 *   schemas:
 *     Subtitle:
 *       type: object
 *       required:
 *         - filename
 *         - filler
 *         - episode
 *         - season
 *         - showName
 *         - language
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the subtitle
 *         filename:
 *           type: string
 *           description: The filename of the subtitle file
 *         filler:
 *           type: boolean
 *           description: Indicates if the episode is a filler
 *         episode:
 *           type: integer
 *           description: The episode number
 *         season:
 *           type: integer
 *           description: The season number
 *         showName:
 *           type: string
 *           description: The name of the show
 *         language:
 *           type: string
 *           description: The language of the subtitle
 *         releaseGroup:
 *           type: string
 *           description: The release group of the subtitle
 *         dialogCount:
 *           type: integer
 *           description: The number of dialogs in the subtitle
 *   parameters:
 *     pageParam:
 *       in: query
 *       name: page
 *       schema:
 *         type: integer
 *         default: 1
 *       description: The page number
 *     limitParam:
 *       in: query
 *       name: limit
 *       schema:
 *         type: integer
 *         default: 10
 *       description: The number of items per page
 */

/**
 * @swagger
 * /subtitles:
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
 *         description: The created subtitle
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subtitle'
 *       400:
 *         description: Invalid input
 *       429:
 *         description: Too many requests
 */
router.post('/', createSubtitleLimiter, validateSubtitle, subtitleController.createSubtitle);

/**
 * @swagger
 * /subtitles:
 *   get:
 *     summary: Retrieve a list of subtitles
 *     tags: [Subtitles]
 *     parameters:
 *       - $ref: '#/components/parameters/pageParam'
 *       - $ref: '#/components/parameters/limitParam'
 *       - in: query
 *         name: showName
 *         schema:
 *           type: string
 *         description: Filter by show name
 *       - in: query
 *         name: season
 *         schema:
 *           type: integer
 *         description: Filter by season number
 *       - in: query
 *         name: episode
 *         schema:
 *           type: integer
 *         description: Filter by episode number
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *         description: Filter by language
 *       - in: query
 *         name: filler
 *         schema:
 *           type: boolean
 *         description: Filter by filler status
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort order (e.g., {"episode":1} for ascending, {"episode":-1} for descending)
 *     responses:
 *       200:
 *         description: A list of subtitles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subtitles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Subtitle'
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalItems:
 *                   type: integer
 */
router.get('/', subtitleController.getSubtitles);

/**
 * @swagger
 * /subtitles/{id}:
 *   put:
 *     summary: Update a subtitle
 *     tags: [Subtitles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The subtitle id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subtitle'
 *     responses:
 *       200:
 *         description: The updated subtitle
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subtitle'
 *       404:
 *         description: Subtitle not found
 */
router.put('/:id', validateSubtitle, subtitleController.updateSubtitle);

/**
 * @swagger
 * /subtitles/{id}:
 *   delete:
 *     summary: Delete a subtitle
 *     tags: [Subtitles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The subtitle id
 *     responses:
 *       200:
 *         description: Subtitle deleted successfully
 *       404:
 *         description: Subtitle not found
 */
router.delete('/:id', subtitleController.deleteSubtitle);

/**
 * @swagger
 * /subtitles/{id}/with-dialogs:
 *   get:
 *     summary: Get a subtitle with its dialogs
 *     tags: [Subtitles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The subtitle id
 *       - $ref: '#/components/parameters/pageParam'
 *       - $ref: '#/components/parameters/limitParam'
 *     responses:
 *       200:
 *         description: A subtitle with its dialogs
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Subtitle'
 *                 - type: object
 *                   properties:
 *                     dialogs:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Dialog'
 *                     dialogPagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         totalPages:
 *                           type: integer
 *                         totalItems:
 *                           type: integer
 *       404:
 *         description: Subtitle not found
 */
router.get('/:id', subtitleController.getSubtitleWithDialogs);

module.exports = router;
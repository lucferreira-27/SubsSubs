const express = require('express');
const router = express.Router();
const dialogController = require('../controllers/dialogController');
const { validateDialog } = require('../middleware/inputValidation');

/**
 * @swagger
 * components:
 *   schemas:
 *     Dialog:
 *       type: object
 *       required:
 *         - subtitleId
 *         - text
 *         - startTime
 *         - endTime
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the dialog
 *         subtitleId:
 *           type: string
 *           description: The id of the associated subtitle
 *         text:
 *           type: string
 *           description: The dialog text
 *         startTime:
 *           type: string
 *           description: The start time of the dialog
 *         endTime:
 *           type: string
 *           description: The end time of the dialog
 *         name:
 *           type: string
 *           description: The name of the character speaking (optional)
 */

/**
 * @swagger
 * /dialogs:
 *   post:
 *     summary: Create a new dialog
 *     tags: [Dialogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dialog'
 *     responses:
 *       201:
 *         description: The created dialog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dialog'
 *       400:
 *         description: Invalid input
 */
router.post('/', validateDialog, dialogController.createDialog);

/**
 * @swagger
 * /dialogs:
 *   get:
 *     summary: Retrieve a list of dialogs
 *     tags: [Dialogs]
 *     parameters:
 *       - $ref: '#/components/parameters/pageParam'
 *       - $ref: '#/components/parameters/limitParam'
 *     responses:
 *       200:
 *         description: A list of dialogs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dialogs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Dialog'
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalItems:
 *                   type: integer
 */
router.get('/', dialogController.getDialogs);

/**
 * @swagger
 * /dialogs/{id}:
 *   put:
 *     summary: Update a dialog
 *     tags: [Dialogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The dialog id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dialog'
 *     responses:
 *       200:
 *         description: The updated dialog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dialog'
 *       404:
 *         description: Dialog not found
 */
router.put('/:id', validateDialog, dialogController.updateDialog);

/**
 * @swagger
 * /dialogs/{id}:
 *   delete:
 *     summary: Delete a dialog
 *     tags: [Dialogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The dialog id
 *     responses:
 *       200:
 *         description: Dialog deleted successfully
 *       404:
 *         description: Dialog not found
 */
router.delete('/:id', dialogController.deleteDialog);

/**
 * @swagger
 * /dialogs/search:
 *   get:
 *     summary: Search for dialogs
 *     tags: [Dialogs]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The search query
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of results per page
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     totalResults:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       subtitle:
 *                         $ref: '#/components/schemas/Subtitle'
 *                       dialogs:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/Dialog'
 *                       matchCount:
 *                         type: integer
 *       400:
 *         description: Invalid input
 */
router.get('/search', dialogController.searchDialogs);

module.exports = router;
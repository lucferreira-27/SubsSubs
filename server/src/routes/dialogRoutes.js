const express = require('express');
const router = express.Router();
const dialogController = require('../controllers/dialogController');

// Move the search route to the top
router.get('/search-dialogs', dialogController.searchDialogs);

/**
 * @swagger
 * /api/dialogs:
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
 *         description: Created dialog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dialog'
 *       500:
 *         description: Server error
 */
router.post('/', dialogController.createDialog);

/**
 * @swagger
 * /api/dialogs/{id}:
 *   get:
 *     summary: Get a dialog by ID
 *     tags: [Dialogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A dialog object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dialog'
 *       404:
 *         description: Dialog not found
 *       500:
 *         description: Server error
 */
router.get('/:id', dialogController.getDialogById);

/**
 * @swagger
 * /api/dialogs/subtitle/{subtitleId}:
 *   get:
 *     summary: Get dialogs by subtitle ID
 *     tags: [Dialogs]
 *     parameters:
 *       - in: path
 *         name: subtitleId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of dialogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dialog'
 *       500:
 *         description: Server error
 */
router.get('/subtitle/:subtitleId', dialogController.getDialogsBySubtitleId);

/**
 * @swagger
 * /api/dialogs/{id}:
 *   put:
 *     summary: Update a dialog
 *     tags: [Dialogs]
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
 *             $ref: '#/components/schemas/Dialog'
 *     responses:
 *       200:
 *         description: Updated dialog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dialog'
 *       404:
 *         description: Dialog not found
 *       500:
 *         description: Server error
 */
router.put('/:id', dialogController.updateDialog);

/**
 * @swagger
 * /api/dialogs/{id}:
 *   delete:
 *     summary: Delete a dialog
 *     tags: [Dialogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dialog deleted successfully
 *       404:
 *         description: Dialog not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', dialogController.deleteDialog);

module.exports = router;
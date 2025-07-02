const express = require('express');
const router = express.Router();
const { rootInfo } = require('../controllers/rootController');

/**
 * @swagger
 * /:
 *   get:
 *     summary: Endpoint raiz com informações da API
 *     tags: [Root]
 *     responses:
 *       200:
 *         description: Informações sobre a API
 */
router.get('/', rootInfo);

module.exports = router;
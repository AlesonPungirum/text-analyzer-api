const express = require('express');
const router = express.Router();
const { getHealthStatus } = require('../controllers/healthController');

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Verifica o status da API
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API está funcionando
 *         content:
 *           application/json:
 *             example:
 *               status: healthy
 *               timestamp: '2025-07-02T01:09:39.736Z'
 */

router.get('/', getHealthStatus);

module.exports = router;

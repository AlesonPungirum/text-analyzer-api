const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

/**
 * @swagger
 * /api/search-term:
 *   get:
 *     summary: Busca um termo na última análise de texto realizada
 *     description: |
 *       Endpoint que permite buscar a ocorrência de um termo específico na última análise de texto processada.
 *       Retorna informações sobre:
 *       - Se o termo foi encontrado
 *       - Número de ocorrências do termo
 *       - Timestamp da última análise realizada
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: term
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 1
 *           maxLength: 100
 *         description: Termo a ser buscado na última análise realizada
 *         example: "produto"

 *     responses:
 *       200:
 *         description: Busca realizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 term_found:
 *                   type: boolean
 *                   description: Indica se o termo foi encontrado na última análise
 *                   example: true
 *                 occurrences:
 *                   type: integer
 *                   description: Número total de ocorrências do termo encontrado
 *                   minimum: 0
 *                   example: 1
 *                 last_analysis_date:
 *                   type: string
 *                   format: date-time
 *                   description: Data e hora da última análise realizada no formato ISO 8601
 *                   example: "2025-07-02T00:21:25.791Z"
 * 
 */
router.get('/', searchController.searchTerm);

module.exports = router;
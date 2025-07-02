const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');

/**
 * @swagger
 * /api/analyze-text:
 *   post:
 *     summary: Analisa um texto e retorna estatísticas e sentimento
 *     description: |
 *       Endpoint que realiza análise completa de texto incluindo:
 *       - Contagem de palavras
 *       - Top 5 palavras mais frequentes
 *       - Análise de sentimento com score de confiança
 *       - Timestamp da análise
 *     tags: [Analysis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 description: Texto a ser analisado
 *                 minLength: 1
 *                 maxLength: 5000
 *                 example: "Este produto é incrível! Estou muito satisfeito."
 *           examples:
 *             exemplo_positivo:
 *               summary: Texto com sentimento positivo
 *               value:
 *                 text: "Este produto é incrível! Estou muito satisfeito."
 *             exemplo_negativo:
 *               summary: Texto com sentimento negativo
 *               value:
 *                 text: "Produto terrível, não recomendo para ninguém."
 *             exemplo_neutro:
 *               summary: Texto neutro
 *               value:
 *                 text: "O produto chegou na data prevista conforme especificado."
 *     responses:
 *       200:
 *         description: Análise completa do texto realizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_words:
 *                   type: integer
 *                   description: Número total de palavras no texto
 *                   example: 8
 *                 top_5_words:
 *                   type: array
 *                   description: As 5 palavras mais frequentes no texto
 *                   items:
 *                     type: object
 *                     properties:
 *                       word:
 *                         type: string
 *                         description: A palavra
 *                       count:
 *                         type: integer
 *                         description: Número de ocorrências
 *                   example:
 *                     - word: "este"
 *                       count: 1
 *                     - word: "produto"
 *                       count: 1
 *                     - word: "incrível"
 *                       count: 1
 *                     - word: "estou"
 *                       count: 1
 *                     - word: "satisfeito"
 *                       count: 1
 *                 sentiment_summary:
 *                   type: object
 *                   description: Resumo da análise de sentimento
 *                   properties:
 *                     sentiment:
 *                       type: string
 *                       description: Classificação do sentimento
 *                       enum: ["Muito Positivo", "Positivo", "Neutro", "Negativo", "Muito Negativo"]
 *                       example: "Muito Positivo"
 *                     confidence:
 *                       type: number
 *                       format: float
 *                       description: Nível de confiança da análise (0-100)
 *                       minimum: 0
 *                       maximum: 100
 *                       example: 63.09
 *                     all_scores:
 *                       type: object
 *                       description: Scores detalhados para cada categoria
 *                       properties:
 *                         "Muito Positivo":
 *                           type: number
 *                           format: float
 *                         "Positivo":
 *                           type: number
 *                           format: float
 *                         "Neutro":
 *                           type: number
 *                           format: float
 *                         "Negativo":
 *                           type: number
 *                           format: float
 *                         "Muito Negativo":
 *                           type: number
 *                           format: float
 *                       example:
 *                         "Muito Positivo": 63.09
 *                         "Positivo": 30.96
 *                         "Neutro": 2.35
 *                         "Muito Negativo": 1.98
 *                         "Negativo": 1.62
 *                     api_used:
 *                       type: string
 *                       description: API utilizada para análise
 *                       example: "Hugging Face"
 *                 analyzed_at:
 *                   type: string
 *                   format: date-time
 *                   description: Timestamp da análise no formato ISO 8601
 *                   example: "2025-07-01T22:35:29.968Z"
 *             examples:
 *               resposta_positiva:
 *                 summary: Análise de texto positivo
 *                 value:
 *                   total_words: 8
 *                   top_5_words:
 *                     - word: "este"
 *                       count: 1
 *                     - word: "produto"
 *                       count: 1
 *                     - word: "incrível"
 *                       count: 1
 *                     - word: "estou"
 *                       count: 1
 *                     - word: "satisfeito"
 *                       count: 1
 *                   sentiment_summary:
 *                     sentiment: "Muito Positivo"
 *                     confidence: 63.09
 *                     all_scores:
 *                       "Muito Positivo": 63.09
 *                       "Positivo": 30.96
 *                       "Neutro": 2.35
 *                       "Muito Negativo": 1.98
 *                       "Negativo": 1.62
 *                     api_used: "Hugging Face"
 *                   analyzed_at: "2025-07-01T22:35:29.968Z"
 *               resposta_negativa:
 *                 summary: Análise de texto negativo
 *                 value:
 *                   total_words: 7
 *                   top_5_words:
 *                     - word: "produto"
 *                       count: 1
 *                     - word: "terrível"
 *                       count: 1
 *                     - word: "não"
 *                       count: 1
 *                     - word: "recomendo"
 *                       count: 1
 *                     - word: "para"
 *                       count: 1
 *                   sentiment_summary:
 *                     sentiment: "Muito Negativo"
 *                     confidence: 78.45
 *                     all_scores:
 *                       "Muito Negativo": 78.45
 *                       "Negativo": 15.32
 *                       "Neutro": 4.12
 *                       "Positivo": 1.56
 *                       "Muito Positivo": 0.55
 *                     api_used: "Hugging Face"
 *                   analyzed_at: "2025-07-01T22:35:29.968Z"
 *       400:
 *         description: Texto vazio ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                 code:
 *                   type: string
 *                   description: Código de erro
 *                 details:
 *                   type: string
 *                   description: Detalhes adicionais do erro
 *             examples:
 *               texto_vazio:
 *                 summary: Texto vazio
 *                 value:
 *                   error: "Texto não pode estar vazio"
 *                   code: "INVALID_INPUT"
 *                   details: "O campo 'text' é obrigatório e deve conter pelo menos 1 caractere"
 *               texto_muito_longo:
 *                 summary: Texto muito longo
 *                 value:
 *                   error: "Texto muito longo"
 *                   code: "TEXT_TOO_LONG"
 *                   details: "O texto deve ter no máximo 5000 caracteres"
 *               formato_invalido:
 *                 summary: Formato JSON inválido
 *                 value:
 *                   error: "Formato de requisição inválido"
 *                   code: "INVALID_JSON"
 *                   details: "O corpo da requisição deve ser um JSON válido - Unexpected token t in JSON at position 4"
 * 
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 code:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *             example:
 *               error: "Ocorreu um erro ao processar o texto: problema interno no servidor."
 *               code: "INTERNAL_SERVER_ERROR"
 *               timestamp: "2025-07-01T22:35:29.968Z"
 * 
 */

router.post('/', analysisController.analyzeText);

module.exports = router;
const sentimentService = require('../services/sentimentService');
const textProcessingService = require('../services/textProcessingService');

let lastAnalysisCache = { text: '', words: [], analyzedAt: null };

exports.analyzeText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({
        error: "O texto não pode estar vazio",
        code: "INVALID_INPUT",
        details: "O campo 'text' é obrigatório e deve conter pelo menos 1 caractere"
      });
    }
    if (text.length > 5000) {
      return res.status(413).json({
        error: "O texto muito longo",
        code: "TEXT_TOO_LONG",
        details: "O texto deve ter no máximo 5000 caracteres"
      });
    }
    const allWords = textProcessingService.cleanAndTokenize(text);
    const filteredWords = textProcessingService.removeStopwords(allWords);

    const wordCount = textProcessingService.countWords(filteredWords);
    const top5Words = textProcessingService.getTopWords(wordCount, 5);

    const sentimentSummary = await sentimentService.analyzeSentiment(text);

    const analyzedAt = new Date().toISOString();
    lastAnalysisCache = { text: text.toLowerCase(), words: allWords, analyzedAt };

    res.json({
      total_words: allWords.length,
      top_5_words: top5Words,
      sentiment_summary: sentimentSummary,
      analyzed_at: analyzedAt
    });
  } catch (error) {

    res.status(500).json({
      error: "Ocorreu um erro ao processar o texto: problema interno no servidor. " + error.message,
      code: "INTERNAL_SERVER_ERROR",
      timestamp: new Date().toISOString()
    });
  }
};

exports.getLastAnalysis = () => lastAnalysisCache;
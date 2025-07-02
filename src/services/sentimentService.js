const axios = require('axios');

exports.analyzeSentiment = async (text) => {
  try {
    const truncatedText = text.substring(0, 512);

    const response = await axios.post(
      'https://router.huggingface.co/hf-inference/models/tabularisai/multilingual-sentiment-analysis',
      { inputs: truncatedText },
      { headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` }, timeout: 30000 }
    );

    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      const sentimentMap = {
        'Very Negative': 'Muito Negativo',
        'Negative': 'Negativo',
        'Neutral': 'Neutro',
        'Positive': 'Positivo',
        'Very Positive': 'Muito Positivo'
      };

      const sentimentScores = {};
      response.data[0].forEach(item => {
        const ptLabel = sentimentMap[item.label] || item.label;
        sentimentScores[ptLabel] = Math.round(item.score * 10000) / 100;
      });

      const dominant = Object.entries(sentimentScores).reduce((a, b) => (a[1] > b[1] ? a : b));

      return { sentiment: dominant[0], confidence: dominant[1], all_scores: sentimentScores, api_used: 'Hugging Face' };
    }

    return fallbackSentiment(text);

  } catch (error) {
    console.error('Erro na API Hugging Face:', error.message);
    return fallbackSentiment(text);
  }
};

const fallbackSentiment = (text) => {
  const positiveWords = new Set(['bom', 'ótimo', 'excelente', 'maravilhoso', 'feliz', 'positivo']);
  const negativeWords = new Set(['ruim', 'péssimo', 'horrível', 'triste', 'negativo']);

  const words = text.toLowerCase().split(/\s+/);
  const positiveCount = words.filter(word => positiveWords.has(word)).length;
  const negativeCount = words.filter(word => negativeWords.has(word)).length;

  const total = positiveCount + negativeCount;
  let sentiment = 'Neutro', confidence = 50.0;

  if (total > 0) {
    if (positiveCount > negativeCount) {
      sentiment = 'Positivo';
      confidence = (positiveCount / total) * 100;
    } else if (negativeCount > positiveCount) {
      sentiment = 'Negativo';
      confidence = (negativeCount / total) * 100;
    }
  }

  return { sentiment, confidence: Math.round(confidence * 100) / 100, method: 'Fallback simples' };
};
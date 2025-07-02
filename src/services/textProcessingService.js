const { STOPWORDS } = require('../utils/stopwords');

exports.cleanAndTokenize = (text) => {
  const cleanText = text.toLowerCase().replace(/[^\w\sàáâãäéèêëíìîïóòôõöúùûü]/g, ' ');
  return cleanText.split(/\s+/).filter(word => word.length > 2);
};

exports.removeStopwords = (words) => {
  return words.filter(word => !STOPWORDS.has(word));
};

exports.countWords = (words) => {
  const count = {};
  words.forEach(word => { count[word] = (count[word] || 0) + 1; });
  return count;
};

exports.getTopWords = (wordCount, limit) => {
  return Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word, count]) => ({ word, count }));
};
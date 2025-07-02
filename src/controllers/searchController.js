const { getLastAnalysis } = require('./analysisController');

exports.searchTerm = (req, res) => {
  const { term } = req.query;

  if (!term || term.trim() === '') {
    return res.status(400).json({ error: 'O termo de busca não pode estar vazio' });
  }

  const cache = getLastAnalysis();
  if (!cache.text) {
    return res.json({ term_found: false, occurrences: 0, last_analysis_date: null });
  }

  const occurrences = cache.words.filter(word => word === term.toLowerCase()).length;

  res.json({
    term_found: occurrences > 0,
    occurrences: occurrences,
    last_analysis_date: cache.analyzedAt
  });
};
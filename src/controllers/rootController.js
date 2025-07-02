exports.rootInfo = (req, res) => {
  res.json({
    message: 'API de Análise de Texto com IA',
    version: '1.0.0',
    endpoints: {
      'POST /api/analyze-text': 'Analisa texto e retorna estatísticas + sentimento',
      'GET /api/search-term': 'Busca termo na última análise',
      'GET /api/health': 'Verifica status da API',
      'GET /docs': 'Documentação Swagger'
    }
  });
};

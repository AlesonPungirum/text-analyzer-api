/**
 * Exemplo de como usar a API de Análise de Texto
 * Este arquivo demonstra todas as funcionalidades disponíveis
 */

const axios = require('axios');

// Configuração da API
const API_BASE_URL = 'http://localhost:3000';

// Classe cliente para a API
class TextAnalyzerClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Analisa um texto
  async analyzeText(text) {
    try {
      const response = await this.client.post('api/analyze-text', { text });
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao analisar texto: ${error.response?.data?.error || error.message}`);
    }
  }

  // Busca um termo na última análise
  async searchTerm(term) {
    try {
      const response = await this.client.get('api/search-term', {
        params: { term }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao buscar termo: ${error.response?.data?.error || error.message}`);
    }
  }

  // Verifica o status da API
  async checkHealth() {
    try {
      const response = await this.client.get('api/health');
      return response.data;
    } catch (error) {
      throw new Error(`API não está respondendo: ${error.message}`);
    }
  }
}

// Exemplos de uso
async function exemplosDeUso() {
  const client = new TextAnalyzerClient();

  console.log('=== Exemplos de Uso da API de Análise de Texto ===\n');

  try {
    // 1. Verificar saúde da API
    console.log('1. Verificando status da API...');
    const health = await client.checkHealth();
    console.log('   Status:', health.status);
    console.log('   Timestamp:', health.timestamp);
    console.log();

    // 2. Analisar texto positivo
    console.log('2. Analisando texto positivo...');
    const textoPositivo = `
      Este é um dia maravilhoso! Estou muito feliz com os resultados do projeto.
      A equipe fez um trabalho excelente e superamos todas as expectativas.
      O futuro parece brilhante e estou otimista com as próximas oportunidades.
    `;
    
    const analisePositiva = await client.analyzeText(textoPositivo);
    console.log('   Resultado:');
    console.log('   - Total de palavras:', analisePositiva.total_words);
    console.log('   - Sentimento:', analisePositiva.sentiment_summary.sentiment);
    console.log('   - Confiança:', analisePositiva.sentiment_summary.confidence + '%');
    console.log('   - Top 3 palavras:', analisePositiva.top_5_words.slice(0, 3));
    console.log();

    // 3. Analisar texto negativo
    console.log('3. Analisando texto negativo...');
    const textoNegativo = `
      Que dia terrível! Tudo está dando errado hoje.
      Os problemas não param de aparecer e estou muito frustrado.
      Não sei como vou resolver essa situação difícil.
    `;
    
    const analiseNegativa = await client.analyzeText(textoNegativo);
    console.log('   Resultado:');
    console.log('   - Sentimento:', analiseNegativa.sentiment_summary.sentiment);
    console.log('   - Confiança:', analiseNegativa.sentiment_summary.confidence + '%');
    console.log();

    // 4. Analisar texto técnico
    console.log('4. Analisando texto técnico...');
    const textoTecnico = `
      JavaScript é uma linguagem de programação versátil usada tanto no frontend
      quanto no backend. Com Node.js, podemos criar aplicações robustas e escaláveis.
      Express.js facilita a criação de APIs RESTful eficientes.
    `;
    
    const analiseTecnica = await client.analyzeText(textoTecnico);
    console.log('   Resultado:');
    console.log('   - Total de palavras:', analiseTecnica.total_words);
    console.log('   - Top 5 palavras:', analiseTecnica.top_5_words);
    console.log();

    // 5. Buscar termos
    console.log('5. Buscando termos na última análise...');
    const termos = ['JavaScript', 'Node.js', 'Python', 'API'];
    
    for (const termo of termos) {
      const resultado = await client.searchTerm(termo);
      if (resultado.term_found) {
        console.log(`   ✓ "${termo}" encontrado ${resultado.occurrences} vez(es)`);
      } else {
        console.log(`   ✗ "${termo}" não encontrado`);
      }
    }
    console.log();

    // 6. Análise de sentimentos detalhada
    console.log('6. Análise detalhada de sentimentos...');
    const textoMisto = `
      O projeto começou com alguns desafios, mas conseguimos superar as dificuldades.
      Apesar dos problemas iniciais, o resultado final foi satisfatório.
      Aprendemos muito com os erros e agora estamos mais preparados.
    `;
    
    const analiseMista = await client.analyzeText(textoMisto);
    console.log('   Scores completos:');
    Object.entries(analiseMista.sentiment_summary.all_scores || {}).forEach(([sentimento, score]) => {
      console.log(`   - ${sentimento}: ${score}%`);
    });

  } catch (error) {
    console.error('Erro:', error.message);
  }
}

// Exemplo de integração em uma aplicação
async function exemploIntegracao() {
  console.log('\n=== Exemplo de Integração ===\n');

  const client = new TextAnalyzerClient();

  // Simula análise de comentários de usuários
  const comentarios = [
    { id: 1, usuario: 'João', texto: 'Produto excelente! Recomendo muito!' },
    { id: 2, usuario: 'Maria', texto: 'Não gostei. Qualidade deixa a desejar.' },
    { id: 3, usuario: 'Pedro', texto: 'Normal. Atende o básico, nada especial.' }
  ];

  console.log('Analisando comentários de usuários...\n');

  for (const comentario of comentarios) {
    try {
      const analise = await client.analyzeText(comentario.texto);
      console.log(`Comentário de ${comentario.usuario}:`);
      console.log(`"${comentario.texto}"`);
      console.log(`Sentimento: ${analise.sentiment_summary.sentiment} (${analise.sentiment_summary.confidence}%)`);
      console.log('---');
    } catch (error) {
      console.error(`Erro ao analisar comentário ${comentario.id}:`, error.message);
    }
  }
}

// Executar exemplos
(async () => {
  await exemplosDeUso();
  await exemploIntegracao();
})();
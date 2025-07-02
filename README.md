# API de Análise de Texto com IA - Node.js

> This is a challenge by [Coodesh](https://coodesh.com/)

## Descrição

API REST desenvolvida em Node.js com arquitetura em camadas que analisa textos em português, retorna estatísticas e detecta sentimentos usando inteligência artificial.

## Funcionalidades

- Análise estatística de texto (contagem de palavras)
- Identificação das 5 palavras mais frequentes (excluindo stopwords)
- Análise de sentimento usando IA
- Busca de termos na última análise
- Tratamento de erros com status HTTP apropriados
- Cache em memória para histórico
- Rate limiting para proteção da API
- Arquitetura em camadas para escalabilidade

## Arquitetura

O projeto utiliza uma arquitetura em camadas para melhor organização e manutenção:

```
├── client-example.js
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── app.js
    ├── controllers
    │   ├── analysisController.js
    │   ├── healthController.js
    │   ├── rootController.js
    │   └── searchController.js
    ├── docs
    │   └── swagger.js
    ├── routes
    │   ├── analysisRoutes.js
    │   ├── healthRoutes.js
    │   ├── index.js
    │   ├── rootRoutes.js
    │   └── searchRoutes.js
    ├── services
    │   ├── sentimentService.js
    │   └── textProcessingService.js
    └── utils
        └── stopwords.js
```

## Tecnologias Utilizadas

- **Linguagem:** Node.js (14+)
- **Framework:** Express.js
- **Arquitetura:** Arquitetura em Camadas
- **IA:** Hugging Face API (modelo BERT multilíngue)
- **Documentação:** Swagger
- **HTTP Client:** Axios
- **Segurança:** CORS, Rate Limiting

## Pré-requisitos

- Node.js 14 ou superior
- NPM ou Yarn
- Conta no [Hugging Face](https://huggingface.co)

## Como Instalar e Usar

### 1. Clone o repositório

```bash
git clone https://github.com/AlesonPungirum/text-analyzer-api
cd text-analyzer-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure a API do Hugging Face

Para usar a análise de sentimentos com IA:

1. Crie uma conta gratuita em [https://huggingface.co](https://huggingface.co)
2. Gere um token de API em [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
3. Configure o token no projeto:
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione a variável: `HUGGING_FACE_TOKEN=hf_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
   - Ou substitua diretamente no arquivo `app.js`

### 4. Execute o projeto

```bash
# Modo desenvolvimento
npm run dev

# Modo produção
npm start
```

A API estará disponível em `http://localhost:3000`

## Documentação da API

Após iniciar o servidor, acesse a documentação Swagger em:
```
http://localhost:3000/api-docs
```

### Endpoints Principais

#### POST /analyze
Analisa um texto e retorna estatísticas

**Request:**
```json
{
  "text": "Este produto é incrível! Estou muito satisfeito."
}
```

**Response:**
```json
{
  "total_words": 8,
  "top_5_words": [
    {
      "word": "este",
      "count": 1
    },
    {
      "word": "produto",
      "count": 1
    },
    {
      "word": "incrível",
      "count": 1
    },
    {
      "word": "estou",
      "count": 1
    },
    {
      "word": "satisfeito",
      "count": 1
    }
  ],
  "sentiment_summary": {
    "sentiment": "Muito Positivo",
    "confidence": 63.09,
    "all_scores": {
      "Muito Positivo": 63.09,
      "Positivo": 30.96,
      "Neutro": 2.35,
      "Muito Negativo": 1.98,
      "Negativo": 1.62
    },
    "api_used": "Hugging Face"
  },
  "analyzed_at": "2025-07-01T22:35:29.968Z"
}
}
```

#### GET /search?term=palavra
Busca um termo na última análise realizada

## Segurança

- Rate limiting configurado para 100 requisições por minuto
- CORS habilitado com configurações seguras
- Validação de entrada em todos os endpoints

## Recursos Externos

- **StopWords:** Lista obtida de [https://gist.github.com/alopes/5358189](https://gist.github.com/alopes/5358189)
- **Modelo de IA:** BERT multilíngue via Hugging Face

## Contato

Seu Nome - Aleson Pereira Pungirum
E-mail: aleson@sabemostec.com.br
WhatsApp: +55 33 999911570
Link do Projeto: [https://github.com/AlesonPungirum/text-analyzer-api](https://github.com/AlesonPungirum/text-analyzer-api)

---

Feito com ❤️ para o desafio [Coodesh](https://coodesh.com/)
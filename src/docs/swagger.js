const swaggerJsdoc = require('swagger-jsdoc');

const PORT = process.env.PORT || 3000;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Análise de Texto com IA',
      version: '1.0.0',
      description: 'API REST que analisa textos e detecta sentimentos usando IA',
    },
    servers: [{ url: `http://localhost:${PORT}`, description: 'Servidor local' }],
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(swaggerOptions);
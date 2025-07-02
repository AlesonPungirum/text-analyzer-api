require('dotenv').config();

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const rootRoutes = require('./routes/rootRoutes');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
// Rate limit apenas nas rotas da API
app.use('/api/', limiter);
app.use('/api', routes);

//Rotas sem Rate limit
app.use('/', rootRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(400).json({
      error: "Formato de requisição inválido",
      code: "INVALID_JSON",
      details: "O corpo da requisição deve ser um JSON válido - " + err.message 
    });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`✓ API rodando em http://localhost:${PORT}`);
  console.log(`✓ Documentação disponível em http://localhost:${PORT}/docs`);
});
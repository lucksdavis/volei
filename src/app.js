const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const playerRoutes = require('./routes/players'); // Importando as rotas de jogadores

dotenv.config(); // Carregar variáveis de ambiente
console.log('MONGODB_URI:', process.env.MONGODB_URI); // Debug: verificar a URI do MongoDB

const app = express();

// Middleware para processar JSON antes das rotas
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.log('Erro ao conectar ao MongoDB:', err));

// Rotas de jogadores
app.use('/api', playerRoutes); // Usa as rotas de jogadores com o prefixo "/api"

// Rota de boas-vindas
app.get('/', (req, res) => {
  res.send('Bem-vindo ao site de controle de jogos de vôlei!');
});

// Iniciar o servidor
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

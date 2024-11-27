const express = require('express');
const Player = require('../models/player'); // Importa o modelo de jogador
const router = express.Router();

// Rota para criar um jogador
router.post('/players', async (req, res) => {
  try {
    const player = new Player(req.body); // Pega os dados enviados pelo usuário
    await player.save(); // Salva no banco de dados
    res.status(201).send(player); // Envia o jogador criado de volta como resposta
  } catch (err) {
    res.status(400).send(err.message); // Se der erro, envia a mensagem do erro
  }
});

// Rota para listar todos os jogadores
router.get('/players', async (req, res) => {
  try {
    const players = await Player.find(); // Pega todos os jogadores do banco
    res.status(200).send(players); // Envia a lista como resposta
  } catch (err) {
    res.status(500).send(err.message); // Se der erro, envia a mensagem do erro
  }
});

module.exports = router; // Exporta as rotas para usar no app

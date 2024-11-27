const express = require('express');
const mongoose = require('mongoose');

// Definir o esquema do jogador
const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  height: {
    type: Number,
    required: true
  }
});

// Criar o modelo Mongoose
const Player = mongoose.model('Player', playerSchema);

// Criar o roteador do Express
const router = express.Router();

// Rotas para o CRUD (Create, Read, Update, Delete)

// [POST] Criar um jogador
router.post('/players', async (req, res) => {
  try {
    const player = new Player(req.body); // Criar um novo jogador com os dados do corpo da requisição
    await player.save(); // Salvar no banco de dados
    res.status(201).send(player); // Retornar o jogador criado
  } catch (error) {
    res.status(400).send(error.message); // Retornar erros de validação ou outros problemas
  }
});

// [GET] Listar todos os jogadores
router.get('/players', async (req, res) => {
  try {
    const players = await Player.find(); // Buscar todos os jogadores no banco
    res.status(200).send(players); // Retornar a lista de jogadores
  } catch (error) {
    res.status(500).send(error.message); // Retornar erro caso algo falhe
  }
});

// [GET] Buscar um jogador pelo ID
router.get('/players/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id); // Buscar jogador pelo ID
    if (!player) {
      return res.status(404).send('Jogador não encontrado'); // Caso o jogador não exista
    }
    res.status(200).send(player); // Retornar o jogador encontrado
  } catch (error) {
    res.status(500).send(error.message); // Retornar erro caso algo falhe
  }
});

// [PUT] Atualizar um jogador pelo ID
router.put('/players/:id', async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }); // Atualizar jogador e validar os dados
    if (!player) {
      return res.status(404).send('Jogador não encontrado'); // Caso o jogador não exista
    }
    res.status(200).send(player); // Retornar o jogador atualizado
  } catch (error) {
    res.status(400).send(error.message); // Retornar erros de validação ou outros problemas
  }
});

// [DELETE] Excluir um jogador pelo ID
router.delete('/players/:id', async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id); // Excluir jogador pelo ID
    if (!player) {
      return res.status(404).send('Jogador não encontrado'); // Caso o jogador não exista
    }
    res.status(200).send('Jogador excluído com sucesso'); // Retornar sucesso
  } catch (error) {
    res.status(500).send(error.message); // Retornar erro caso algo falhe
  }
});

// Exportar o roteador para ser usado no app.js
module.exports = router;

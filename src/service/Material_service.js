const express = require('express');
const router = express.Router();
const Material = require('../models/material');
const expressJwt = require('express-jwt');

// Rota para buscar todos os materiais
router.get('/',expressJwt({ secret: 'material' }), async (req, res) => {
  try {
    const materiais = await Material.findAll();
    res.json(materiais);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar materiais' });
  }
});

// Rota para buscar um material por id
router.get('/:id', expressJwt({ secret: 'material' }),async (req, res) => {
  try {
    const material = await Material.findOne({ where: { id: req.params.id } });
    if (material) {
      res.json(material);
    } else {
      res.status(404).json({ message: 'Material não encontrado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar material' });
  }
});

// Rota para buscar materiais por descrição
router.get('/descricao/:descricao',expressJwt({ secret: 'material' }), async (req, res) => {
  try {
    const materiais = await Material.findAll({ where: { descrição: req.params.descricao } });
    res.json(materiais);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar materiais por descrição' });
  }
});

// Rota para buscar materiais por quantidade
router.get('/quantidade/:quantidade',expressJwt({ secret: 'material' }), async (req, res) => {
  try {
    const materiais = await Material.findAll({ where: { quantidade: req.params.quantidade } });
    res.json(materiais);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar materiais por quantidade' });
  }
});

// Rota para buscar materiais por precoCusto
router.get('/precoCusto/:precoCusto',expressJwt({ secret: 'material' }), async (req, res) => {
  try {
    const materiais = await Material.findAll({ where: { precoCusto: req.params.precoCusto } });
    res.json(materiais);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar materiais por valor' });
  }
});

// Rota para buscar materiais por valor
router.get('/preco/:preco',expressJwt({ secret: 'material' }), async (req, res) => {
  try {
    const materiais = await Material.findAll({ where: { preco: req.params.preco } });
    res.json(materiais);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar materiais por valor' });
  }
});

  // criar um material
router.post('/',expressJwt({ secret: 'material' }), async (req, res) => {
  const { nome, descricao, preco, unidade } = req.body;
  try {
    const novoMaterial = await Material.create({
      nome,
      descricao,
      preco,
      unidade
    });
    res.json(novoMaterial);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

  // Atualizar um material por ID
router.put('/:id',expressJwt({ secret: 'material' }), async function (req, res) {
    const material = req.body;
    const id = req.params.id;
    try {
        const result = await Material.update(material, { where: { id: id } });
        res.json(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
module.exports = router;
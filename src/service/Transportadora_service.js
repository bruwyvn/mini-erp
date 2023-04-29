const express = require('express');
const router = express.Router();
const Transportadora = require('../models/transportadora');
const expressJwt = require('express-jwt');

// Puxar todos as transportadoras
router.get('/', expressJwt({ secret: 'transportadora' }),async (req, res) => {
  try {
    const transportadoras = await Transportadora.findAll();
    res.json(transportadoras);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro interno no servidor');
  }
});

// Puxar 1 só por nome
router.get('/nome/:name',expressJwt({ secret: 'transportadora' }), async (req, res) => {
  try {
    const transportadora = await Transportadora.findOne({ where: { name: req.params.name } });
    if (transportadora) {
      res.json(transportadora);
    } else {
      res.status(404).send('Transportadora não encontrada');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro interno no servidor');
  }
});

// Puxar por documento
router.get('/documento/:documento', expressJwt({ secret: 'transportadora' }),async (req, res) => {
  try {
    const transportadora = await Transportadora.findOne({ where: { documento: req.params.documento } });
    if (transportadora) {
      res.json(transportadora);
    } else {
      res.status(404).send('Transportadora não encontrada');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro interno no servidor');
  }
});

// Puxar por email
router.get('/email/:email',expressJwt({ secret: 'transportadora' }), async (req, res) => {
  try {
    const transportadora = await Transportadora.findOne({ where: { email: req.params.email } });
    if (transportadora) {
      res.json(transportadora);
    } else {
      res.status(404).send('Transportadora não encontrada');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro interno no servidor');
  }
});

// Puxar por telefone
router.get('/telefone/:telefone',expressJwt({ secret: 'transportadora' }), async (req, res) => {
  try {
    const transportadora = await Transportadora.findOne({ where: { telefone: req.params.telefone } });
    if (transportadora) {
      res.json(transportadora);
    } else {
      res.status(404).send('Transportadora não encontrada');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro interno no servidor');
  }
});

// Puxar por telefone e email
router.get('/telefone-email/:telefone/:email',expressJwt({ secret: 'transportadora' }), async (req, res) => {
  try {
    const transportadora = await Transportadora.findOne({ where: { telefone: req.params.telefone, email: req.params.email } });
    if (transportadora) {
      res.json(transportadora);
    } else {
      res.status(404).send('Transportadora não encontrada');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro interno no servidor');
  }
});

  // criar uma trasnportadora 
router.post('/',expressJwt({ secret: 'transportadora' }), async (req, res) => {
  const { name, documento, telefone, email, observacao } = req.body;
  try {
    const novaTransportadora = await Transportadora.create({
      name,
      documento,
      telefone,
      email,
      observacao
    });
    res.json(novaTransportadora);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

  // Atualizar uma trasnportadora por ID
  router.put('/:id', expressJwt({ secret: 'transportadora' }),async function (req, res) {
    const transportadora = req.body;
    const id = req.params.id;
    try {
        const result = await Transportadora.update(transportadora, { where: { id: id } });
        res.json(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  // Excluir um trasnportadora por ID
  router.delete('/:id', expressJwt({ secret: 'transportadora' }),async function (req, res) {
    const id = req.params.id;
    try {
        const result = await Transportadora.destroy({ where: { id: id } });
        res.json(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

module.exports = router;

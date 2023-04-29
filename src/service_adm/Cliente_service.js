const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente.js');
const expressJwt = require('express-jwt');

// rota para puxar todos os clientes
router.get('/',expressJwt({ secret: 'adm' }),  async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// rota para puxar um cliente pelo id
router.get('/:id', expressJwt({ secret: 'adm' }), async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (cliente === null) {
      res.status(404).json({ message: 'Cliente não encontrado' });
    } else {
      res.json(cliente);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// rota para puxar um cliente pelo endereço
router.get('/endereco/:endereco',expressJwt({ secret: 'adm' }), async (req, res) => {
  try {
    const clientes = await Cliente.findAll({ where: { endereco: req.params.endereco } });
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// rota para puxar um cliente pelo documento
router.get('/documento/:documento',expressJwt({ secret: 'adm' }), async (req, res) => {
  try {
    const cliente = await Cliente.findOne({ where: { documento: req.params.documento } });
    if (cliente === null) {
      res.status(404).json({ message: 'Cliente não encontrado' });
    } else {
      res.json(cliente);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// rota para puxar um cliente pelo telefone
router.get('/telefone/:telefone',expressJwt({ secret: 'adm' }),  async (req, res) => {
  try {
    const clientes = await Cliente.findAll({ where: { telefone: req.params.telefone } });
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Rota para criar um cliente
router.post('/', expressJwt({ secret: 'adm' }), async (req, res) => {
    const { name, documento, telefone, email, endereco, ativo } = req.body;
    try {
      const novoCliente = await Cliente.create({
        name,
        documento,
        telefone,
        email,
        endereco,
        ativo
      });
      res.json(novoCliente);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no servidor');
    }
  });
// Rota para atualizar um cliente existente
router.put('/:id', expressJwt({ secret: 'adm' }), async (req, res) => {
    try {
      const cliente = await Cliente.findByPk(req.params.id);
  
      if (!cliente) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }
  
      await cliente.update(req.body);
  
      return res.status(200).json(cliente);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao atualizar o cliente' });
    }
  });
  
  // Rota para deletar um cliente existente
  router.delete('/:id',expressJwt({ secret: 'adm' }),  async (req, res) => {
    try {
      const cliente = await Cliente.findByPk(req.params.id);
  
      if (!cliente) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }
  
      await cliente.destroy();
  
      return res.status(200).json({ message: 'Cliente excluído com sucesso' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao excluir o cliente' });
    }
  });



module.exports = router;

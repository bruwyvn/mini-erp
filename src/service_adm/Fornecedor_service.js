const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Fornecedor = require('../models/Fornecedor');
const expressJwt = require('express-jwt');

// Rota para puxar todos os fornecedores
router.get('/',expressJwt({ secret: 'adm' }), async (req, res) => {
  try {
    const fornecedores = await Fornecedor.findAll();
    res.json(fornecedores);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Rota para puxar fornecedor por id
router.get('/:id',expressJwt({ secret: 'adm' }), async (req, res) => {
  const { id } = req.params;
  try {
    const fornecedor = await Fornecedor.findByPk(id);
    if (!fornecedor) {
      return res.status(404).json({ msg: 'Fornecedor não encontrado' });
    }
    res.json(fornecedor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Rota para puxar fornecedor por nome
router.get('/nome/:nome',expressJwt({ secret: 'adm' }), async (req, res) => {
  const { nome } = req.params;
  try {
    const fornecedores = await Fornecedor.findAll({
      where: {
        name: {
          [Op.like]: `%${nome}%`
        }
      }
    });
    if (!fornecedores.length) {
      return res.status(404).json({ msg: 'Fornecedor não encontrado' });
    }
    res.json(fornecedores);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Rota para puxar fornecedor por documento
router.get('/documento/:documento', expressJwt({ secret: 'adm' }),async (req, res) => {
  const { documento } = req.params;
  try {
    const fornecedores = await Fornecedor.findAll({
      where: {
        documento
      }
    });
    if (!fornecedores.length) {
      return res.status(404).json({ msg: 'Fornecedor não encontrado' });
    }
    res.json(fornecedores);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Rota para puxar fornecedor por razão social
router.get('/razao-social/:razaoSocial',expressJwt({ secret: 'adm' }), async (req, res) => {
  const { razaoSocial } = req.params;
  try {
    const fornecedores = await Fornecedor.findAll({
      where: {
        razaoSocial: {
          [Op.like]: `%${razaoSocial}%`
        }
      }
    });
    if (!fornecedores.length) {
      return res.status(404).json({ msg: 'Fornecedor não encontrado' });
    }
    res.json(fornecedores);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

router.get('/telefone/:telefone', expressJwt({ secret: 'adm' }),async (req, res) => {
    const { telefone } = req.params;
    try {
      const fornecedores = await Fornecedor.findAll({
        where: {
          telefone: telefone
        }
      });
      res.json(fornecedores);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no servidor');
    }
  });
  
  router.get('/email/:email', expressJwt({ secret: 'adm' }),async (req, res) => {
    const { email } = req.params;
    try {
      const fornecedores = await Fornecedor.findAll({
        where: {
          email: email
        }
      });
      res.json(fornecedores);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no servidor');
    }
  });


  // Rota para criar um novo fornecedor
router.post('/', expressJwt({ secret: 'adm' }),async (req, res) => {
    const { name, documento, razaoSocial, telefone, email, endereco } = req.body;
    try {
      const novoFornecedor = await Fornecedor.create({
        name,
        documento,
        razaoSocial,
        telefone,
        email,
        endereco
      });
      res.json(novoFornecedor);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no servidor');
    }
  });
  
  // Rota para atualizar um fornecedor pelo ID
  router.put('/:id',expressJwt({ secret: 'adm' }), async (req, res) => {
    const { name, documento, razaoSocial, telefone, email, endereco } = req.body;
    const { id } = req.params;
    try {
      const fornecedor = await Fornecedor.findOne({ where: { id } });
      if (fornecedor) {
        fornecedor.name = name;
        fornecedor.documento = documento;
        fornecedor.razaoSocial = razaoSocial;
        fornecedor.telefone = telefone;
        fornecedor.email = email;
        fornecedor.endereco = endereco;
        await fornecedor.save();
        res.json(fornecedor);
      } else {
        res.status(404).send('Fornecedor não encontrado');
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no servidor');
    }
  });
  
  // Rota para deletar um fornecedor pelo ID
  router.delete('/:id',expressJwt({ secret: 'adm' }), async (req, res) => {
    const { id } = req.params;
    try {
      const fornecedor = await Fornecedor.findOne({ where: { id } });
      if (fornecedor) {
        await fornecedor.destroy();
        res.json({ message: 'Fornecedor deletado com sucesso' });
      } else {
        res.status(404).send('Fornecedor não encontrado');
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no servidor');
    }
  });
  module.exports = router;

const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Compra = require('../models/Compra');
const expressJwt = require('express-jwt');

// Rota para puxar todas as compras
router.get('/',expressJwt({ secret: 'adm' }), async (req, res) => {
  try {
    const compras = await Compra.findAll();
    res.json(compras);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para puxar compras por data e hora
router.get('/datahora',expressJwt({ secret: 'adm' }), async (req, res) => {
  try {
    const { data, hora } = req.query;
    const compras = await Compra.findAll({
      where: {
        data,
        hora,
      },
    });
    res.json(compras);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para puxar compras por descrição
router.get('/descricao',expressJwt({ secret: 'adm' }), async (req, res) => {
  try {
    const { descricao } = req.query;
    const compras = await Compra.findAll({
      where: {
        descricao: {
          [Op.iLike]: `%${descricao}%`,
        },
      },
    });
    res.json(compras);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para puxar compras por quantidade
router.get('/quantidade', expressJwt({ secret: 'adm' }),async (req, res) => {
  try {
    const { quantidade } = req.query;
    const compras = await Compra.findAll({
      where: {
        quantidade,
      },
    });
    res.json(compras);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Rota para atualizar uma compra
router.put('/:id', expressJwt({ secret: 'adm' }),async (req, res) => {
    try {
      const { id } = req.params;
      const { descricao, data, hora, quantidade } = req.body;
  
      const compra = await Compra.findByPk(id);
  
      if (!compra) {
        return res.status(404).json({ message: 'Compra não encontrada' });
      }
  
      await compra.update({ descricao, data, hora, quantidade });
  
      res.json(compra);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Rota para deletar uma compra
  router.delete('/:id',expressJwt({ secret: 'adm' }), async (req, res) => {
    try {
      const { id } = req.params;
  
      const compra = await Compra.findByPk(id);
  
      if (!compra) {
        return res.status(404).json({ message: 'Compra não encontrada' });
      }
  
      await compra.destroy();
  
      res.json({ message: 'Compra deletada com sucesso' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

//  criar  compra 
  router.post('/', expressJwt({ secret: 'adm' }),async (req, res) => {
    const { descricao, data, hora, quantidade, materialId, fornecedorId } = req.body;
    try {
      const novaCompra = await Compra.create({
        descricao,
        data,
        hora,
        quantidade,
        materialId,
        fornecedorId
      });
      res.json(novaCompra);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no servidor');
    }
  });

// Rota para puxar a compra por material
router.get('/material/:materialId',expressJwt({ secret: 'adm' }), async (req, res) => {
    try {
      const compras = await Compra.findAll({
        include: [{ model: Material }],
        where: { materialId: req.params.materialId },
      });
      res.json(compras);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao puxar as compras por material');
    }
  });
  
  // Rota para puxar a compra por fornecedor
  router.get('/fornecedor/:fornecedorId',expressJwt({ secret: 'adm' }), async (req, res) => {
    try {
      const compras = await Compra.findAll({
        include: [{ model: Fornecedor }],
        where: { fornecedorId: req.params.fornecedorId },
      });
      res.json(compras);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao puxar as compras por fornecedor');
    }
  });
  


module.exports = router;

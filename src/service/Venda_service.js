const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Venda = require('../models/Venda');
const expressJwt = require('express-jwt');

// Rota para buscar todas as vendas
router.get('/', expressJwt({ secret: 'venda' }),async (req, res) => {
    try {
        const vendas = await Venda.findAll();
        res.json(vendas);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para buscar uma venda pelo ID
router.get('/:id', expressJwt({ secret: 'venda' }), async (req, res) => {
    const { id } = req.params;
    try {
        const venda = await Venda.findByPk(id);
        if (!venda) {
            return res.status(404).send('Venda não encontrada');
        }
        res.json(venda);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para buscar as vendas por data e hora
router.get('/datahora',  expressJwt({ secret: 'venda' }),async (req, res) => {
    const { data, hora } = req.query;
    try {
        const vendas = await Venda.findAll({
            where: {
                data,
                hora,
            },
        });
        res.json(vendas);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para buscar as vendas por quantidade
router.get('/quantidade', expressJwt({ secret: 'venda' }), async (req, res) => {
    const { quantidade } = req.query;
    try {
        const vendas = await Venda.findAll({
            where: {
                quantidade,
            },
        });
        res.json(vendas);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para buscar as vendas por descrição
router.get('/descricao',  expressJwt({ secret: 'venda' }),async (req, res) => {
    const { descricao } = req.query;
    try {
        const vendas = await Venda.findAll({
            where: {
                descricao: {
                    [Op.like]: `%${descricao}%`,
                },
            },
        });
        res.json(vendas);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});


// Rota para buscar todas as vendas
router.get('/', expressJwt({ secret: 'venda' }), async (req, res) => {
    try {
        const vendas = await Venda.findAll();
        res.json(vendas);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});
// Rota para buscar as vendas por descrição do material
router.get('/material', expressJwt({ secret: 'venda' }), async (req, res) => {
    const descricao = req.query.descricao;
    try {
        const vendas = await Venda.findAll({
            include: [{
                model: Material,
                where: {
                    descricao: {
                        [Op.like]: `%${descricao}%`,
                    }
                }
            }]
        });
        res.json(vendas);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para buscar as vendas por ID do material
router.get('/material/:id', expressJwt({ secret: 'venda' }), async (req, res) => {
    const { id } = req.params;
    try {
        const vendas = await Venda.findAll({
            where: {
                materialId: id
            }
        });
        res.json(vendas);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para buscar as vendas por ID do cliente
router.get('/cliente', expressJwt({ secret: 'venda' }), async (req, res) => {
    const { clienteId } = req.query;
    try {
        const vendas = await Venda.findAll({
            where: {
                clienteId: clienteId,
            },
        });
        res.json(vendas);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para buscar as vendas por documento do cliente
router.get('/cliente', expressJwt({ secret: 'venda' }), async (req, res) => {
    const { documento } = req.query;
    try {
        const vendas = await Venda.findAll({
            include: [{
                model: Cliente,
                where: {
                    documento: documento
                }
            }]
        });
        res.json(vendas);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});


// Rota para buscar as vendas por documento da transportadora
router.get('/transportadora', expressJwt({ secret: 'venda' }), async (req, res) => {
    const { documento } = req.query;
    try {
        const vendas = await Venda.findAll({
            include: [{
                model: Transportadora,
                where: {
                    documento: documento
                }
            }]
        });
        res.json(vendas);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

module.exports = router;

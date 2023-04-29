const express = require('express');
const router = express.Router();
const User = require('../model/Usuario');
const expressJwt = require('express-jwt');



// Criar um novo usuário
router.post('/', expressJwt({ secret: 'usuario' }),(req, res) => {
  const { name, email, password } = req.body;

  User.create({
    name,
    email,
    password
  })
    .then((user) => {
      res.status(201).json(user.toJSON());
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

// Ler todos os usuários
router.get('/', expressJwt({ secret: 'usuario' }),(req, res) => {
  User.findAll()
    .then((users) => {
      res.json(users.map((user) => user.toJSON()));
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

//  buscar usuário por tipo
router.get('/tipoUsuario', expressJwt({ secret: 'usuario' }), async (req, res) => {
  const { tipoUsuario } = req.query;
  try {
      const user = await User.findAll({
          where: {
            tipoUsuario,
          },
      });
      res.json(user);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no servidor');
  }
});


// Ler um usuário específico
router.get('/:id',expressJwt({ secret: 'usuario' }), (req, res) => {
  const { id } = req.params;

  User.findByPk(id)
    .then((user) => {
      if (user) {
        res.json(user.toJSON());
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});
// Atualizar um usuário
router.put('/:id',expressJwt({ secret: 'usuario' }), (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  User.findByPk(id)
    .then((user) => {
      if (user) {
        user.name = name;
        user.email = email;
        user.password = password;

        return user.save();
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    })
    .then((user) => {
      res.json(user.toJSON());
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Deletar um usuário
router.delete('/:id',expressJwt({ secret: 'usuario' }), (req, res) => {
  const { id } = req.params;

  User.findByPk(id)
    .then((user) => {
      if (user) {
        return user.destroy();
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    })
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});
module.exports = router;



const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente.js');
const expressJwt = require('express-jwt');
const User = require('../model/Usuario');


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let token = null;


  try {
      const users = await User.findAll({
          where: {
            email,
            password 
          },
      });
      const userRec = users[0]; 
  if (userRec.tipoUsuario == 'cliente') {
    token = jwt.sign({ email }, 'cliente', { expiresIn: '1h' });
  } else if (userRec.tipoUsuario == 'venda') {
    token = jwt.sign({ email }, 'venda', { expiresIn: '1h' });
  }else if (userRec.tipoUsuario == 'compra') {
    token = jwt.sign({ email }, 'compra', { expiresIn: '1h' });
  }else if (userRec.tipoUsuario == 'fornecedor') {
    token = jwt.sign({ email }, 'fornecedor', { expiresIn: '1h' });
  }else if (userRec.tipoUsuario == 'material') {
    token = jwt.sign({ email }, 'material', { expiresIn: '1h' });
  }else if (userRec.tipoUsuario == 'tranportadora') {
    token = jwt.sign({ email }, 'tranportadora', { expiresIn: '1h' });
  }else if (userRec.tipoUsuario == 'usuario') {
    token = jwt.sign({ email }, 'usuario', { expiresIn: '1h' });
  }else if (userRec.tipoUsuario == 'adm') {
    token = jwt.sign({ email }, 'adm', { expiresIn: '1h' });
  }

  if (token) {
    res.json({ token });
  } else {
    res.status(401).send('Unauthorized');
  }
} catch (err) {
  console.error(err.message);
  res.status(500).send('Erro no servidor');
}

});



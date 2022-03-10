const express= require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuarios-controller');

router.post('/cadastro', usuariosController.cadastroUsuario);

router.post('/login', usuariosController.loginUsuario);

module.exports = router;
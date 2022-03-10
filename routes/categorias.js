const express= require('express');
const router = express.Router();
const login = require('../middleware/login');

const categoriasController = require('../controllers/categoria-controll')

router.get('/', categoriasController.getCategorias);
router.post('/', categoriasController.ṕostCategorias);

module.exports = router
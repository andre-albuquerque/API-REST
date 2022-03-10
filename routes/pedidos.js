const express= require('express');
const router = express.Router();

const pedidosController = require('../controllers/pedidos-controller')

// retorna todos os pedidos
router.get('/', pedidosController.getPedidos);

// insere um pedido
router.post('/', pedidosController.postPedidos);

// retorna os dados de um pedido
router.get('/:id_pedido', pedidosController.getUmPedido);

// exclui um pedido
router.delete('/', pedidosController.deletePedido);

module.exports = router;
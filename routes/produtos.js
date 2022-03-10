const express= require('express');
const router = express.Router();
const multer = require('multer');
const login = require('../middleware/login')
const produtosController = require('../controllers/produtos-controller');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads');
    },
    filename: (req, file, cb)=>{
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb)=>{
    if (file.mimetype == 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false)
    }
}

const upload = multer({
    storage,
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
});

// retorna todos os produtos
router.get('/', produtosController.getProdutos);

// insere um produto
router.post(
    '/',
    upload.single('produto_imagem'), 
    login, 
    produtosController.postProdutos
);

// retorna os dados de um produto
router.get('/:id_produto', produtosController.umProduto);

// altera um produto
router.patch('/', produtosController.alteraProduto)

// exclui um produto
router.delete('/', produtosController.excluiProduto)

module.exports = router;
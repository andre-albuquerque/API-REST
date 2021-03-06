const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');
const rotaUsuarios = require('./routes/usuarios');
const rotaCategorias = require('./routes/categorias')

app.use('/uploads', express.static('uploads')); // tornando a pasta uploads disponível publicamente
app.use(bodyParser.urlencoded({extended: true})); //apenas dados simples
app.use(bodyParser.json()); // json de entrada no body

app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);
app.use('/categorias', rotaCategorias);
app.use('/usuarios', rotaUsuarios);

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
        if (req.method === 'OPTIONS'){
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
            return res.status(200).send({});
        }

        next();
});

// quando não encontra rota entra aqui:
app.use((req, res, next)=>{
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;
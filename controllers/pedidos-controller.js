const mysql = require('../mysql')

exports.getPedidos = async (req, res, next)=>{
    try {
        const result = await mysql.execute(
            `SELECT pedidos.id_pedido,
                    pedidos.quant,
                    produtos.id_produto,
                    produtos.nome,
                    produtos.preco
            FROM pedidos
            INNER JOIN produtos
            ON produtos.id_produto = pedidos.id_produto`)
        const response = {
            pedidos: result.map(pedido => {
                return {
                    id_pedido: pedido.id_pedido,
                    quantidade: pedido.quant,
                    produto: {
                        id_produto: pedido.id_produto,
                        nome: pedido.nome,
                        preco: pedido.preco
                    },                            
                    
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna os pedidos',
                        url: 'http://localhost:3000/pedidos' + pedido.id_pedido
                    }
                }
            })
        }
        res.status(200).send({response})
    } catch (error) {
        return res.status(500).send({error: error})
    }
}

exports.postPedidos = async (req,res,next)=>{
    try {
        const result = await mysql.execute(`INSERT INTO pedidos (id_produto, quant) VALUES (${req.body.id_produto},${req.body.quant})`)
        const response = {
            mensagem: 'Pedido inserido com sucesso',
            pedidoCriado: {
                id_pedido: result.id_pedido,
                id_produto: req.body.id_produto,
                quantidade: req.body.quantidade,
                request: {
                    tipo: 'POST',
                    descricao: 'Insere um pedido',
                    url: 'http://localhost:3000/pedidos'
                }    
            }
        }
        return res.status(201).send(response);
    
    } catch (error) {
        return res.status(500).send({error: error})
    }
};

exports.getUmPedido = async (req,res,next)=>{
    try {
        const result = await mysql.execute(`SELECT * FROM pedidos WHERE id_pedido = ${req.params.id_pedido}`)
        const response = {
            pedido: {
                id_pedido: result[0].id_pedido,
                id_produto: result[0].id_produto,
                quantidade: result[0].quant,
                request: {
                    tipo: 'GET',
                    descricao: 'Retorna todos os pedidos',
                    url: 'http://localhost:3000/pedidos'
                }    
            }
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({error: error})
    }
};

exports.deletePedido = async (req, res, next)=>{
    try {
        const query = `DELETE FROM pedidos WHERE id_pedido = ${req.body.id_pedido}`;
        await mysql.execute(query);
        const response = {
            mensagem: 'Pedido removido com sucesso',
            request: {
                tipo: 'POST',
                descricao: 'Insere um pedido',
                url: 'https://localhost/3000/pedidos',
                body: {
                    id_produto: 'Number',
                    quantidade: 'Number'
                }
            }                   
        };                
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({error: error});
    }
}

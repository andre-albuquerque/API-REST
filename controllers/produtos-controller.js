const mysql = require('../mysql');

exports.getProdutos = async (req, res, next)=>{
    try {
        let name = '';
        if (req.query.name){
            name = req.query.name
        }

        const query = `
            SELECT *
                FROM produtos
                WHERE categoriaId = ?
                AND (
                    name LIKE '%${name}%'
                )
        `
        const result = await mysql.execute(query, [
            req.query.categoriaId
        ])
        const response = {
            quantidade: result.length,
            produtos: result.map(prod => {
                return {
                    id_produto: prod.id_produto,
                    nome: prod.nome,
                    preço: prod.preco,
                    imagem_produto: prod.imagem_produto,
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna os produtos',
                        url: 'http://localhost:3000/produtos' + prod.id_produto
                    }
                }
            })
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({error: error})
    }
};


exports.postProdutos = async (req,res,next)=>{
    try {
        const query = 'INSERT INTO produtos (nome, preco, produto_imagem, categoriaId) VALUES (?, ?, ?)'
        const result = await mysql.execute(query, [
                req.body.nome, 
                req.body.preco, 
                req.file.path,
                req.body.categoriaId
            ])
        const response = {
            mensagem: 'Produto inserido com sucesso',
            produtoCriado: {
                id_produto: result.id_produto,
                nome: req.body.nome,
                preco: req.body.preco,
                produto_imagem: req.file.path,
                categoriaId: req.body.categoriaId,
                request: {
                    tipo: 'GET',
                    descricao: 'Retorna todos os produtos',
                    url: 'http://localhost:3000/produtos'
                }    
            }
        }
        return res.status(201).send(response);   
    } catch (error) {
        return res.status(500).send({error: error})
    }
}


exports.umProduto = async (req, res, next)=>{
    try {
        const query = `SELECT * FROM produtos WHERE id_produto = ${req.params.id_produto}`
        const result = await mysql.execute(query)
        const response = {
            produto: {
                id_produto: result[0].id_produto,
                nome: result[0].nome,
                preco: result[0].preco,
                request: {
                    tipo: 'GET',
                    descricao: 'Retorna produto de um ID específico',
                    url: 'http://localhost:3000/produtos'
                }    
            }
        }
        return res.status(200).send(response);            
    } catch (error) {
        return res.status(500).send({error: error})
    }
}

exports.alteraProduto = async (req, res, next)=>{
    try {
        const query =  `UPDATE produtos
                        SET nome = '${req.body.nome}',
                            preco = '${req.body.preco}'
                        WHERE id_produto = ${req.body.id_produto}`
        await mysql.execute(query)
        const response = {
            menssagem: 'Produto atualizado com sucesso',
            produtoUpdate: {
                id_produto: req.body.id_produto,
                nome: req.body.nome,
                preco: req.body.preco,
                request: {
                    tipo: 'POST',
                    descricao: 'Atualiza um produto',
                    url: 'http://localhost:3000/produtos/' + req.body.id_produto
                }    
            }
        }
        return res.status(202).send(response);
     
    } catch (error) {
        return res.status(500).send({error: error})
    }
};

exports.excluiProduto = async (req, res, next)=>{
    try {
        const query = `DELETE FROM produtos WHERE id_produto = ${req.body.id_produto}`
        await mysql.execute(query)
        const response = {
            mensagem: 'Produto removido com sucesso',
            request: {
                tipo: 'POST',
                descricao: 'Insere um produto',
                url: 'https://localhost/3000/produtos',
                body: {
                    nome: 'String',
                    preco: 'Number'
                }
            }                    
        }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({error: error})
    }
};  
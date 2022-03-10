const mysql = require('../mysql');

exports.getCategorias = async (req, res, next)=>{
    try {
        const result = await mysql.execute("SELECT * FROM categorias;")
        const response = {
            quantidade: result.length,
            produtos: result.map(categoria => {
                return {
                    categoriaId: categoria.categoriaId,
                    nome: categoria.nome
                }
            })
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({error: error})
    }
};

exports.postCategoria = async (req,res,next)=>{
    try {
        const query = 'INSERT INTO categorias (nome) VALUES (?)'
        const result = await mysql.execute(query, [
                req.body.nome, 
            ])
        const response = {
            mensagem: 'Categoria inserido com sucesso',
            categoriaCriada: {
                categoriaId: result.insertId,
                nome: req.body.nome,
                request: {
                    tipo: 'GET',
                    descricao: 'Retorna todos as categorias',
                    url: 'http://localhost:3000/categorias'
                }    
            }
        }
        return res.status(201).send(response);   
    } catch (error) {
        return res.status(500).send({error: error})
    }
}


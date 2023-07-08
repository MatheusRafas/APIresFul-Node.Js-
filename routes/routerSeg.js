const express = require('express');
const routerSeg = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

//Importe do Knexfile
const knexConfig = require('../knexfile');
const req = require('express/lib/request');
const knex = require('knex')(knexConfig.development); 

// processa o corpo da requisição e insere os dados recebidos 
// como atributos de req.body
routerSeg.use(express.json());
routerSeg.use(express.urlencoded({ extended: true }))

//Rota de Registro
routerSeg.post ('/register', (req, res) => {
    knex('usuario')
    .insert({
        nome: req.body.nome,
        login: req.body.login,
        senha: bcrypt.hashSync(req.bodu.senha, 8),
        email:req.body.email
    }, ['id'])
    .then((result) => {
        let usuario = result [0]
        res.status(200).json({"message": "Usuário inserido com sucesso", "id":usuario.id})
        return
    })
    .catch(err => {
        res.status(500).json({message: 'Usuario não registrado -' + err.message})
    })
})

//Rota de Login
routerSeg.post ('/login', (req, res) => {
    const{login, senha} = req.body;
    knex('usuarios').where({'login': login})
    .then((dados) => {
        if (dados.length > 0) {
            if (dados [0].senha != senha) {res.status(401).json ({message: 'Usuário ou senha inválidos'})}
            let checkSenha = bcrypt.compareSync (req.body.senha, usuario.senha)
            if (checkSenha){
                jwt.sign({id: dados[0].id, roles: dados[0].roles},
                    process.env.SECRET_KEY,
                    {algorithm: 'HS256'},
                    (err, token) => {
                        if(err) res.status(500).json (`{message: 'Erro ao criar o token: ${err.message}'} `);
                        else
                        res.status(200).json(`{message: 'Autenticação realizada com sucesso',
                        token: ${token}} `)
                    })
            }
        }
        else {
            res.status(401).json ({message: 'Usuário ou senha inválidos'})
        }
    })
    .catch((err) => {
        res.status(500).json({message: `Erro ao obter os usuários: ${err.message}`});
    })
});


module.exports = routerSeg;
const express = require('express');
const routerAPI = express.Router();
const jwt = require('jsonwebtoken');

//Importe do Knexfile
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development); 

// processa o corpo da requisição e insere os dados recebidos 
// como atributos de req.body
routerAPI.use(express.json());
routerAPI.use(express.urlencoded({ extended: true }))

//Autenticar Token
const checkToken = (req, res, next) => {
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1];
   jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
        return res.status(401).json({message: 'Token inválido'})
    }
    else {
        req.id = decoded.id;
        req.roles = decoded.roles;
        next();
    }
   })

}

const isAdmin = (req, res, next) => {
    if(req.roles.indexOf('ADMIN') >= 0) {
        next();
    }
    else {
        return res.status(403).json ({message: 'Acesso negado'});
    }
}

//Obter o pet
routerAPI.get ('/pets', checkToken, (req, res) => {
    console.log (req.id, req.roles);
    knex('pets')
    .then((dados) => {
        res.json(dados); 
    })
    .catch((err) => {
        res.json ({ message: `Erro ao obter os pets: ${err.message}`});
    }); 
});

//Obter um pet especifico
routerAPI.get ('/pets/:id', checkToken, (req, res) => {
   let id = req.params.id;
   knex('pets')
   .where({id})
   .then((dados) => {
       res.json(dados); 
   })
   .catch((err) => {
       res.json ({ message: `Erro ao obter os pets: ${err.message}`});
   }); 
})

//Incluir um pet
routerAPI.post('/pets', checkToken, isAdmin, (req, res) => {
    console.log (req.body);

    knex ('pets')
        .insert(req.body, ['id'])
        .then((dados) => {
            if (dados.length > 0) {
            const id = dados [0].id
            res.status(201).json( { 
                message: 'Pet adicionado com sucesso',
                data: { id } });  
            }    
        });
});

//Alterar um pet
routerAPI.put('/pets/:id', checkToken, isAdmin, (req, res) => {
    let id = req.params.id;
    knex('pets')
      .where({ id })
      .update(req.body)
});

// Deletar um pet
routerAPI.delete('/pets/:id', checkToken, isAdmin, (req, res) => {
    let id = req.params.id;
    knex('pets')
      .where({ id })
      .del()
      .then((dados) => {
        if (dados.length > 0) {
        const id = dados [0].id
        res.status(201).json( { 
            message: 'Pet REMOVIDO com sucesso',
            data: { id } });  
        }    
    });
});

module.exports = routerAPI;
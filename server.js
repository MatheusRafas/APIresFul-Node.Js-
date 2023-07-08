require('dotenv').config();

const express = require ('express');
const app = express();

const routerAPI = require('./routes/routerAPI');
app.use ('/api/v1', routerAPI);

//Rota de segurança
const routerSeg = require('./routes/routerSeg');
app.use ('/seg', routerSeg);

app.use ((req, res) => {    
    res.status(404);
    res.send('Recurso solicitado não existe');
})

// Inicializa o servidor HTTP na porta 3000
const port = 3000
app.listen(port, function () {
    console.log('API rodando na porta 3000')
});
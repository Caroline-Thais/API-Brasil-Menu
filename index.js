const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

const Cardapio = require('./database/Cardapio');

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DataBase connection
connection.authenticate().then(() => {
    console.log('Conexão com o bd feita com sucesso.')
}).catch(error => {
    console.log('error')
});

//Endpoints
app.get('/cardapio', (req, res) => {
    Cardapio.findAll().then(cardapios => {
        res.sendStatus(200);
        res.json('cardapio');
    }).catch(error => {
        res.sendStatus(500);
        console.log(error);
    })
});



//Porta
app.listen(80, () => {
    console.log('API rodando na porta 80.')
});
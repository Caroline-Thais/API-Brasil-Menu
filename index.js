const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

const Cardapio = require('./database/Cardapio');
const { sendStatus } = require('express/lib/response');

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

//Listagem de cardapio
app.get('/cardapio', (req, res) => {
    Cardapio.findAll().then(cardapios => {
        res.sendStatus(200);
        res.json('cardapio');
    }).catch(error => {
        res.sendStatus(500);
        console.log(error);
    })
});

//Listagem de resistro único de um item do cardápio
app.get('/cardapio/:id', (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id);
        Cardapio.findOne({
            where:{
                id: id
            }
        }).then(cardapios => {
            if(nome != undefined){
                res.sendStatus(200);
                res.json('cardapio');
            }else{
                res.sendStatus(404);
            }
        })
    }
});

//Cadastrar item no cardapio
app.post('/cardapio', (req,res) => {
    var { nome, ingredientes } = req.body;
    if (nome == undefined || nome == " " || ingredientes == undefined){
        res.sendStatus(400);
       
    }else{
        Cardapio.create({
            nome: nome,
            ingredientes: ingredientes
        }).then(result => {
            res.sendStatus(201);
        }).catch(error => {
            res.sendStatus(500);
            console.log(error);
        })
    }
});


//Porta
app.listen(80, () => {
    console.log('API rodando na porta 80.')
});
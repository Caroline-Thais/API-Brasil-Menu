const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const cors = require('cors');

const Cardapio = require('./database/Cardapios');

//Cors
app.use(cors());

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DataBase connection
connection.authenticate().then(() => {
    console.log('Conexão com o bd feita com sucesso.')
}).catch(error => {
    console.log('error')
});

//Endpoints:
//Listagem de cardapio
app.get('/cardapio', (req, res) => {
    Cardapio.findAll().then(cardapios => {    
        res.json(cardapios);
        res.sendStatus(200);
    }).catch(error => {
        res.sendStatus(500);
        console.log(error);
        
    })
});

//Listagem de registro único de um item do cardápio
app.get('/cardapio/:id', (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id);
        Cardapio.findOne({
            where:{
                id: id
            }
        }).then(cardapio => {
            if(nome != undefined){
                res.json(cardapio);
                res.sendStatus(200);               
            }else{
                res.sendStatus(404);
            }
        })
    }
});

//Cadastrar item no cardapio
app.post('/cardapio', (req,res) => {
    var { nome, ingredientes, preco } = req.body;
    if (nome == undefined || nome == " " || ingredientes == undefined){
        res.sendStatus(400);
       
    }else{
        Cardapio.create({
            nome: nome,
            ingredientes: ingredientes,
            preco: preco
        }).then(result => {
            res.sendStatus(201);
        }).catch(error => {
            res.sendStatus(500);
            console.log(error);
        })
    }
});

//Deletar dados
app.delete('/cardapio/:id', (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id);
        Cardapio.destroy({
            where:{
                id: id
            }
        }).then(result => {
            if(index == -1){
                res.sendStatus(404)
            }else{
                res.sendStatus(204)
            }
        }).catch(error => {
            res.sendStatus(500);
            console.log(error)
        })
    }
});

//Edição de dados
app.put('/cardapio/:id', (req,res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id);
        var { nome, ingredientes, preco } = req.body;
        if(nome != undefined){
            Cardapio.update({nome: nome}, {
                where:{
                    id: id
                }
            }).then(response => {
                res.sendStatus(200)
            }).catch(error => {
                res.sendStatus(500);
                console.log(error);
            })
        }           
        if(ingredientes != undefined){
            Cardapio.update({ingredientes: ingredientes}, {
                where:{
                    id: id
                }
            }).then().catch(error => {
                res.sendStatus(500);
                console.log(error);
            })
        }  
    }
    if(preco != undefined){
        Cardapio.update({preco: preco}, {
            where:{
                id: id
            }
        }).then().catch(error => {
            res.sendStatus(500);
            console.log(error);
        })
    }  
});



//Porta
app.listen(8080, () => {
    console.log('API rodando na porta 8080.')
});
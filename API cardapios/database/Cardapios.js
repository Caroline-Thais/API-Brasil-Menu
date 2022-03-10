const sequelize = require('sequelize');
const connection = require('./database');

const Cardapio = connection.define('cardapios', {
    nome:{
        type: sequelize.STRING,
        allowNull: false
    },
    ingredientes:{
        type: sequelize.TEXT,
        allowNull: true
    },
    preco:{
        type: sequelize.FLOAT,
        allowNull: true
    },

});

//Cardapio.sync({force: true});

module.exports = Cardapio;
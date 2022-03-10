const sequelize = require('sequelize');

const connection = new sequelize('apicardapiobrasilmenu', 'root', 'Passei1t', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;
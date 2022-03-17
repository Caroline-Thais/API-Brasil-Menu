const sequelize = require('sequelize');
const connection = require('./database');

const User = connection.define('users', {
    usuario:{
        type: sequelize.STRING,
        allowNull: false
    },
    senha:{
        type: sequelize.TEXT,
        allowNull: false
    }
});

//User.sync({force: true});

module.exports = User;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    database: 'burgermeister-db',
    username : 'postgres',
    password : 'root',
    host : 'localhost',
    port : 5432
})

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = {
    sequelize, Sequelize
}
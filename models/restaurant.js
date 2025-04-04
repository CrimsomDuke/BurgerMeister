
const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
    const Restaurant = sequelize.define('Restaurant', {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name : {
            type: DataTypes.STRING,
            allowNull: false,
            validate : {
                len: [6, 100]
            }
        },
        logo : {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    return Restaurant;
}
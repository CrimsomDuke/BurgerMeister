
const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
    const Reviews = sequelize.define('Reviews', {
        id : {
            primaryKey : true,
            type : DataTypes.INTEGER,
            autoIncrement : true,
        },
        rating : {
            type : DataTypes.INTEGER,
            allowNull : false,
            validate : {
                min : 1,
                max : 5
            }
        },
        comment : {
            type : DataTypes.STRING,
            allowNull : true,
            max : 200
        },
        burgerId : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
    })

    return Reviews;
}
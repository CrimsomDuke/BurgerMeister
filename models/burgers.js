
const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
    const Burgers = sequelize.define('Burgers', {
        id: {
            primaryKey : true,
            type : DataTypes.INTEGER,
            autoIncrement : true,
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                len : [3, 50]
            }
        },
        description : {
            type : DataTypes.STRING,
            validate : {
                len : [10, 200]
            }
        },
        price : {
            type : DataTypes.FLOAT,
            allowNull : false,
        },
        image : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                isUrl : true
            }
        },
        restaurantId : {
            type : DataTypes.INTEGER,
            allowNull : false,
        }
    });

    return Burgers;
}
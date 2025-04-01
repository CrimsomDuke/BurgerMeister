
const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
    const Restaurant = sequelize.define('Restaurant', {
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
            validate : {
                isUrl : true
            }
        }
    })

    return Restaurant;
}
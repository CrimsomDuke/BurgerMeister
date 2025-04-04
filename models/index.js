
const { sequelize } = require('../config/db.config');

const Restaurants = require('./restaurant')(sequelize);
const Burgers = require('./burgers')(sequelize);
const Reviews = require('./review')(sequelize);

//config relations

Restaurants.hasMany(Burgers, {
    foreignKey : "restaurantId",
    sourceKey : "id",
    as : "burgers"
})

Burgers.belongsTo(Restaurants, {
    foreignKey : "restaurantId",
    targetKey : "id",
    as : "restaurant"
})

Burgers.hasMany(Reviews, {
    foreignKey : "burgerId",
    sourceKey : "id",
    as : "reviews"
})

Reviews.belongsTo(Burgers, {
    foreignKey : "burgerId",
    targetKey : "id",
    as : "burger"
})

sequelize.sync();

module.exports = {
    Restaurants,
    Burgers,
    sequelize,
    Sequelize : sequelize.Sequelize
}
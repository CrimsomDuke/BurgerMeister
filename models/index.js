
const { sequelize } = require('../config/db.config');

const Restaurants = require('./restaurant')(sequelize);

sequelize.sync();

module.exports = {
    Restaurants
}
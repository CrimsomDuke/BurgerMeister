
module.exports = (mainRouter, adminRouter, db) => {
    require('./restaurant.controller')(mainRouter, adminRouter, db);
}
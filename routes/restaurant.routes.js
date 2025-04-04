
module.exports = (app, adminRouter, mainRouter) => {
    const controller = require('../controllers/restaurant.controller');

    adminRouter.get("/", controller.renderRestaurantsAdmin);
    adminRouter.get('/restaurants/create', controller.renderCreateRestaurantAdmin)
    adminRouter.post('/restaurants/create', controller.createRestaurantAdmin)
    adminRouter.get('/restaurants/edit/:id', controller.renderEditRestaurantAdmin)
    adminRouter.post('/restaurants/edit/:id', controller.updateRestaurantAdmin)
}
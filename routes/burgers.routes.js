
module.exports = (app, adminRouter, mainRouter) => {
    const controller = require('../controllers/burgers.controller');

    adminRouter.get("/burgers/create", controller.renderCreateBurgerAdmin);
    adminRouter.post("/burgers/create", controller.createBurgerAdmin);
    adminRouter.get("/burgers/edit/:id", controller.renderEditBurgerAdmin)
    adminRouter.post("/burgers/edit/:id", controller.UpdateBurgerAdmin)
}
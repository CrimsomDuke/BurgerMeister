
module.exports = (app, adminRouter, mainRouter) => {
    const controller = require('../controllers/burgers.controller');

    adminRouter.get("/burgers/create", controller.renderCreateBurgerAdmin);
    adminRouter.post("/burgers/create", controller.createBurgerAdmin);
    adminRouter.get("/burgers/edit/:id", controller.renderEditBurgerAdmin)
    adminRouter.post("/burgers/edit/:id", controller.UpdateBurgerAdmin)

    //CAREFUL WITH THE ORDER, IF YOU PUT THE ID ROUTE FIRST, IT WILL ALWAYS MATCH
    // (IN THIS CASE DE EXEMPLU) "TOP" AND TAKE IT AS AN ID WHICH CAUSES ERRORS
    mainRouter.get('/burgers/top', controller.renderBurgerTopMain)
    mainRouter.get('/burgers/:id', controller.renderBurgerDetailsMain)
}
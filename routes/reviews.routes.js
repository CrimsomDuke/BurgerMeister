
module.exports = (app, adminRouter, mainRouter) => {
    const controller = require("../controllers/reviews.controller");

    mainRouter.post("/reviews/create", controller.createReviewForBurger);
}
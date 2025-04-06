module.exports = (app, adminRouter, mainRouter) => {
    require('./restaurant.routes')(app, adminRouter, mainRouter);
    require('./burgers.routes')(app, adminRouter, mainRouter);
    require('./reviews.routes')(app, adminRouter, mainRouter);
} 
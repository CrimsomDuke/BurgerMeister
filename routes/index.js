module.exports = (app, adminRouter, mainRouter) => {
    require('./restaurant.routes')(app, adminRouter, mainRouter);
} 
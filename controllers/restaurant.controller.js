
module.exports = (mainRouter, adminRouter, db) => {

    mainRouter.get('/restaurants', async (req, res) => {
        const restaurants = await db.Restaurants.findAll();
        res.send(restaurants.length) 
    })

    adminRouter.get('/restaurants', async(req, res) => {
        res.render("pages/admin/restaurants/list.ejs", { title: "Lista de Restaurantes, Admin" })
    })

    adminRouter.get('/restaurants/create', async(req, res) => {
        res.render("pages/admin/restaurants/create.ejs", { title : "Crear un Restaurant"})
    })
}
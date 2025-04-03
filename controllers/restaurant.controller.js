
module.exports = (mainRouter, adminRouter, db) => {

    mainRouter.get('/restaurants', async (req, res) => {
        const restaurants = await db.Restaurants.findAll();
        res.send(restaurants.length) 
    })

    adminRouter.get('/restaurants', async(req, res) => {
        
        const restaurants = await db.Restaurants.findAll();
        res.render("pages/admin/restaurants/list.ejs", 
            { 
                title: "Lista de Restaurantes, Admin",
                restaurants : restaurants,
            }
        )
    })

    adminRouter.get('/restaurants/create', async(req, res) => {
        res.render("pages/admin/restaurants/create.ejs", { title : "Crear un Restaurant"})
    })

    adminRouter.post('/restaurants/create', async(req, res) => {
        const { name, logo } = req.body;
        await db.Restaurants.create({
            name,
            logo : "www.logo.url.com"
        })
        res.redirect("/admin/restaurants")
    })
}
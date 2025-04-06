

const db = require('../models/')
const path = require('path');

exports.renderRestaurantsAdmin = async (req, res) => {
    const restaurants = await db.Restaurants.findAll();
    res.render("pages/admin/restaurants/list.ejs",
        {
            title: "Lista de Restaurantes, Admin",
            restaurants: restaurants,
        }
    )
}

exports.renderCreateRestaurantAdmin = async (req, res) => {
    res.render("pages/admin/restaurants/create.ejs", { title: "Crear un Restaurant" })
}

exports.renderEditRestaurantAdmin = async (req, res) => {
    const id = req.params.id;
    const restaurant = await db.Restaurants.findByPk(id);
    if (!restaurant) {
        res.redirect("/admin/restaurants")
        return;
    }

    const burgers = await db.Burgers.findAll({ where : { restaurantId : id}})
    console.log("Burgers: ", burgers)

    res.render("pages/admin/restaurants/edit.ejs", {
        title : "Editar Restaurante",
        restaurant : restaurant,
        burgers : burgers
    })

}

exports.renderRestaurantsMain = async (req, res) => {
    const restaurants = await db.Restaurants.findAll();
    res.render("pages/main/restaurants/main.ejs", {
        title : "Bienvenido a BurgerMeister Page",
        restaurants : restaurants
    })
}

exports.renderRestaurantDetailsMain = async(req, res) => {
    const id = req.params.id;
    const theRestaurant = await db.Restaurants.findByPk(id, {
        include : {
            model : db.Burgers,
            as : "burgers"
        }
    });

    if (!theRestaurant) {
        res.redirect("/")
        return;
    }

    res.render("pages/main/restaurants/details.ejs", {
        title : theRestaurant.name,
        restaurant : theRestaurant,
    })
}

exports.createRestaurantAdmin = async (req, res) => {
    const name = req.body.name;
    let theRestaurant = await db.Restaurants.create({
        name,
        logo: "https://placehold.co/600x400" //placeholder
    })

    if (!req.files?.logo){
        console.log("no logo")
        res.redirect("/admin/restaurants")
        return;
    }

    const logo = req.files.logo;
    const fileName = theRestaurant.id + "_" + ".jpg"
    // eslint-disable-next-line no-undef
    const thePath = path.join(__dirname, "/../public/images/restaurants/" + fileName);

    console.log(thePath)

    logo.mv(thePath, async function(err) {
        if (err){
            console.log(err);
            res.redirect("/admin/")
            return;
        }

        theRestaurant.logo = fileName;
        await db.Restaurants.update({
            name : theRestaurant.name,
            logo : theRestaurant.logo
        }, { where : { id : theRestaurant.id }})
        console.log("Logo subido con exito")

        res.redirect("/admin/")
    })
}

exports.updateRestaurantAdmin = async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;

    console.log(req.body)
    
    const logo = req.files?.logo;
    let theRestaurant;
    if(!logo){
        theRestaurant = await db.Restaurants.update({
            name : name,
        }, { where : { id : id }})

        console.log(theRestaurant)
        res.redirect("/admin/")
        return;
    }

    theRestaurant = await db.Restaurants.findByPk(id);
    const fileName = theRestaurant.id + "_" + ".jpg"
    // eslint-disable-next-line no-undef
    const thePath = path.join(__dirname, "/../public/images/restaurants/" + fileName);

    console.log(thePath)

    logo.mv(thePath, async function(err) {
        if (err){
            console.log(err);
            res.redirect("/admin/")
            return;
        }

        theRestaurant.logo = fileName;
        console.log(theRestaurant)
        await db.Restaurants.update({
            name : name,
            logo : theRestaurant.logo
        }, { where : { id : theRestaurant.id }})
        console.log("Logo subido con exito")

        res.redirect("/admin/")
    })

}
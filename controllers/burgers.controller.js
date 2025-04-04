
const { queryObjects } = require('v8');
const db = require('../models/')
const path = require('path');

exports.renderCreateBurgerAdmin = async (req, res) => {
    console.log(req.query.restaurantId);
    if(!req.query.restaurantId){
        res.redirect("/admin/restaurants")
        return;
    }    
    res.render("pages/admin/burgers/create.ejs", { 
        title : "Crear una hamburgruesa",
        restaurantId : req.query.restaurantId
    })
}

exports.renderEditBurgerAdmin = async (req, res) => {
    const id = req.params.id;
    if (!id){
        res.redirect("/admin/burgers")
        return;
    }
    const burger = await db.Burgers.findByPk(id);
    console.log(burger)
    if (!burger) {
        res.redirect("/admin/burgers")
        return;
    }

    res.render("pages/admin/burgers/edit.ejs", {
        title : "Editar hamburguesa",
        burger : burger
    })
}

exports.createBurgerAdmin = async (req, res) => {
    const { restaurantId, name, description, price } = req.body;
    let theBurger = await db.Burgers.create({
        name,
        description,
        price,
        restaurantId,
        image : "https://placehold.co/600x400" //placeholder
    })

    if (!req.files?.image){
        console.log("no image")
        res.redirect("/admin/")
        return;
    }

    const image = req.files.image;
    const fileName = theBurger.id + "_" + ".jpg"
    // eslint-disable-next-line no-undef
    const thePath = path.join(__dirname, "/../public/images/burgers/" + fileName);

    console.log(thePath)

    image.mv(thePath, async function(err) {
        if (err){
            console.log(err);
            res.redirect("/admin/")
            return;
        }

        theBurger.image = fileName;
        await db.Burgers.update({
            image : theBurger.image,
        }, { where : { id : theBurger.id }})
        console.log("Image subido con exito")

        res.redirect("/admin/")
    })

}

exports.UpdateBurgerAdmin = async (req, res) => {
    const { name, description, price, id, restaurantId } = req.body;

    await db.Burgers.update({
        name : name,
        description : description,
        price : price
    }, { where : { id : id }})

    if (!req.files?.image){
        console.log("no image")
        res.redirect("/admin/")
        return;
    }

    const image = req.files.image;
    const fileName = id + "_" + ".jpg"
    // eslint-disable-next-line no-undef
    const thePath = path.join(__dirname, "/../public/images/burgers/" + fileName);

    console.log(thePath)

    image.mv(thePath, async function(err) {
        if (err){
            console.log(err);
            res.redirect("/admin/")
            return;
        }

        theImage = fileName;
        await db.Burgers.update({
            image : theImage,
        }, { where : { id : id }})
        console.log("Image subido con exito")

        res.redirect("/admin/")
    })

    console.log(thePath)
}
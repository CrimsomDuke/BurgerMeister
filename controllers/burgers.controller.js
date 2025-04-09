
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
    const averageRatingRS = await db.Reviews.sequelize.query(
        `SELECT AVG(rating) as averageRating FROM "Reviews" WHERE "burgerId" = ${id}`, {
            replacement : { burgerId : id },
            type : db.Reviews.sequelize.QueryTypes.SELECT
        });

    console.log(burger)
    if (!burger) {
        res.redirect("/admin/burgers")
        return;
    }

    res.render("pages/admin/burgers/edit.ejs", {
        title : "Editar hamburguesa",
        burger : burger,
        averageRating : parseFloat(averageRatingRS[0].averagerating).toFixed(2)
    })
}

exports.renderBurgerDetailsMain = async (req, res) => {
    const id = req.params.id;
    const theBurger = await db.Burgers.findByPk(id, {
        include : {
            model : db.Restaurants,
            as : "restaurant"
        }
    });

    if (!theBurger) {
        console.log("No se encontró la burger");
        res.redirect("/")
        return;
    }

    const theReviews = await db.Reviews.findAll({ where : { burgerId : id }}) 
    const averageRatingRS = await db.Reviews.sequelize.query(
        `SELECT AVG(rating) as averageRating FROM "Reviews" WHERE "burgerId" = ${id}`, {
            replacement : { burgerId : id },
            type : db.Reviews.sequelize.QueryTypes.SELECT
        });

    let theAverageRating = parseFloat(averageRatingRS[0].averagerating).toFixed(1)

    res.render("pages/main/burgers/burger_details.ejs", {
        title : theBurger.name,
        burger : theBurger,
        reviews : theReviews,
        averageRating : theAverageRating
    })
}

exports.renderBurgerTopMain = async (req, res) => {
    const burgers = await db.Burgers.sequelize.query(
        `SELECT 
            b.id, b.name, b.description, b.price, b.image, b."restaurantId",
            AVG(r.rating) as "averageRating"
         FROM "Burgers" b
         LEFT JOIN "Reviews" r ON b.id = r."burgerId"
         GROUP BY b.id, b.name, b.description, b.price, b.image, b."restaurantId"
         ORDER BY "averageRating" DESC`, 
        {
          type: db.Burgers.sequelize.QueryTypes.SELECT
        }
        );

    res.render('pages/main/burgers/burger_list.ejs', {
        title : "Top Burgers",
        burgers : burgers
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

        let theImage = fileName;
        await db.Burgers.update({
            image : theImage,
        }, { where : { id : id }})
        console.log("Image subido con exito")

        res.redirect("/admin/")
    })

    console.log(thePath)
}
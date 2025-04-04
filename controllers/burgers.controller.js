
const db = require('../models/')
const path = require('path');

exports.renderCreateBurgerAdmin = async (req, res) => {
    res.render("pages/admin/burgers/create.ejs", { 
        title : "Crear una hamburgruesa"
    })
}
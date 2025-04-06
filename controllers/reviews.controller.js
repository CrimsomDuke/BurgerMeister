

const db = require("../models/")

exports.createReviewForBurger = async(req, res) => {
    const { burgerId, rating, comment } = req.body;

    await db.Reviews.create({
        burgerId : burgerId,
        rating : rating,
        comment : comment
    })

    res.redirect("/burgers/" + burgerId)
}
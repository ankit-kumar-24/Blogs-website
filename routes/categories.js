const router = require("express").Router();
const Category = require("../models/Category")


// Post
router.post("/", async (req, res) => {
    try {
        const newCat = new Category(req.body)
        const Savedcat = await newCat.save();
        res.status(200).json(Savedcat)
    } catch (error) {
        res.status(400).json(error)
    }
})

// Get

router.get("/", async(req, res) => {
    try {
        const getcategory = await Category.find();
        res.status(200).json(getcategory)
    } catch (error) {
        res.status(400).json(error)
    }
})







module.exports = router
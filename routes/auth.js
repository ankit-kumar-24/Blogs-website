const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt")


// Register
router.post("/register", async(req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)


        const newUser = User({
            username : req.body.username,
            email : req.body.username,
            password : hashedPassword,
        });
        const user = await newUser.save();
        res.status(200).json(user) 
    } catch (error) {
        res.status(400).json(error)
    }
})



// Login
router.post("/login", async(req,res) => {
    try {
        const user = await User.findOne({username : req.body.username})
        !user && res.status(404).json("Wrong credential")

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(404).json("wrong password")

        const { password, ...others} = user._doc;
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router
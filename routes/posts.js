const router = require("express").Router();
const User = require("../models/User")
const Post = require("../models/Post")


// Create Post

router.post("/", async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedpost = await newPost.save();
        res.status(200).json(savedpost)

    } catch (error) {
        res.status(500).json(error)
    }
})

// Update post

router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.username === req.body.username) {
            try {
                const updatepost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
                res.status(200).json(updatepost)
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            res.status(400).json("You can update only your post")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// Delete post

router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.username === req.body.username) {
            try {
                await Post.findByIdAndDelete(req.params.id)
                res.status(200).json("Your post deleted")
            } catch (error) {
                res.status(400).json(error)
            }
        } else {
            res.status(400).json("You can delete your acccount only")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get All post

router.get("/", async (req, res) => {
    const username = req.query.user;
    const catname = req.query.cat;
    try {
        let posts;
        if(username){
             posts = await Post.find({username})
        } else if(catname){
             posts = await Post.find({categories : {
                $in : [catname]
            }})
        }else {
             posts = await Post.find()

        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json(error)
    }
})

// Get post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router
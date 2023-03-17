const express = require("express")
const app = new express();
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const multer = require("multer")
const authroute = require("./routes/auth")
const userroute = require("./routes/users")
const postroute = require("./routes/posts")
const categoryroute = require("./routes/categories")
const User = require("./models/User")
const Post = require("./models/Post")
const Category = require("./models/Category")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, "hello.jpeg")
    }
});


const upload = multer({storage:storage})
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded")
})

dotenv.config();
require("./conn")


app.use(express.json())
app.use("/api/auth", authroute)
app.use("/api/users", userroute)
app.use("/api/post", postroute)
app.use("/api/category", categoryroute)





app.listen("8000", () => {
    console.log("Backend is running")
})
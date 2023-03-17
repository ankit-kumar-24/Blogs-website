const mongoose  = require("mongoose")

mongoose.connect("mongodb://localhost:27017/lamadev_blog", { useNewUrlParser:true, useUnifiedTopology:true })
.then(() => console.log("Connected to Mongodb"))
.catch((err) => console.log(err));
const express = require("express");
const app = express();


app.get("/index" , function(req , res){

    res.render("index")
})


app.listen(3333 , console.log("server ok"))
const express = require("express");
const app = express();

app.set("view engine" ,"html");

app.get("/index" , function(req , res){

    return res.render("index")
})


app.listen(3333 , console.log("server ok"))
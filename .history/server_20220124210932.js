const express = require("express");
const app = express();

//app.set("view engine" ,"html");

app.get("/" , function(req , res){

    return res.render("index.html")
})


app.listen(3333 , console.log("server ok"))
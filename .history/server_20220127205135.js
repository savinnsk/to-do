const express = require("express");
const app = express();

app.set("view engine" ,"pug" );

app.get("/" , function(req , res){

    return res.render("index")
})


app.listen(3333 , console.log("server ok"))
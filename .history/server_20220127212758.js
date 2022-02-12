const nunjucks = require("nunjucks")
const express = require("express");
const app = express();

app.set("view engine" ,"njk" );

nunjucks.configure("./views",{ 
    express:app,
    autoescape:false,
    noCache:true
  })

app.get("/todo" , function(req , res){
    //mostrar todo's
    return res.render("index")
})

app.post("/todo/create" , function (req , res){

    const {title , date} = req.body
    console.log(title)
    return res.redirect("index")
})


app.listen(3333 , console.log("server ok"))
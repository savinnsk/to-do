const nunjucks = require("nunjucks")
const express = require("express");
const app = express();
const multer  = require('multer')
const upload = multer()
const fs = require("fs");
const data = require("./database.json");


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

app.post("/todo" ,upload.fields([]), function (req , res){

    const todo = req.body
   

    fs.writeFile("data.json" , JSON.stringify(todo ,null,2),function(err){
            return res.send(todo)
    })

   

})


app.listen(3333 , console.log("server ok"))
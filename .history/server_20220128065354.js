const nunjucks = require("nunjucks")
const express = require("express");
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser);

app.set("view engine" ,"njk" );

nunjucks.configure("./views",{ 
    express:app,
    autoescape:false,
    noCache:true
  })

const data = []

app.get("/todo" , function(req , res){
    //mostrar todo's
    return res.render("index")
})

app.post("/todo" , function (req , res){

    data.push(req.body)
   return res.send(data)

})


app.listen(3333 , console.log("server ok"))
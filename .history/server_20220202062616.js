const express = require("express");
const app = express();

const nunjucks = require("nunjucks")
const multer  = require('multer')
const upload = multer()
const fs = require("fs");
const {v4 : uuidv4} =  require("uuid");
const methodOverride = require("method-override")

const database = require("./database.json");

app.set("view engine" ,"njk" );
app.use(methodOverride("_method"))

nunjucks.configure("./views",{ 
    express:app,
    autoescape:false,
    noCache:true
  })


app.get("/todo" , (req , res)=> {
    //mostrar todo's
    return res.render("index" ,  {todos : database.todos})
})

app.post("/todo/create" ,upload.fields([]), function (req , res){

    const {title , deadline} = req.body
   
    database.todos.push({
        id  : uuidv4(),
        title,
        deadline : new Date(deadline)
    })

    fs.writeFile("database.json" , JSON.stringify(database ,null,2),function(err){
            return res.redirect("/todo")
    })

   

})


app.delete("/todo/delete/" , (req , res) => {

    const todo = req.body;
    

    const todo = database.todos.find( todo => todo.id === id);

    return res.send(todo)

    
})

app.listen(3333 , console.log("server ok"))
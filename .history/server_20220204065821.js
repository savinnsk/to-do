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
app.get("/todo/edit/:id" , (req , res) => {

    const {id} = req.params;

    const todo = database.todos.find(todo => todo.id === id );

    res.render("edit" , { todo })
})
app.post("/todo/create" ,upload.fields([]), function (req , res){

    let {title , deadline} = req.body

    let dataFormat = new Date(deadline);
    deadline = ("0" + dataFormat.getDate()).substr(-2) + "/" 
    + ("0" + (dataFormat.getMonth() + 1)).substr(-2) + "/" + dataFormat.getFullYear();
   
    database.todos.push({
        id  : uuidv4(),
        title,
        deadline
        //deadline : new Date(deadline)
    })

    fs.writeFile("database.json" , JSON.stringify(database ,null,2),function(err){
            return res.redirect("/todo")
    })

   

})
app.delete("/todo/delete" , upload.fields([]), (req , res) => {

    const {id} = req.body;

    const todo = database.todos.find( todo => todo.id === id);

    database.todos.splice(todo , 1)

    fs.writeFile("database.json" , JSON.stringify(database ,null,2),function(err){
        return res.redirect("/todo")
    })

    
})
app.put("/todo/edit/",upload.fields([]) ,(req , res) => {   
    
    const {id , title , deadline} = req.body
    
    const todoIndex = database.todos.findIndex( todo => todo.id === id );

    database.todos[todoIndex] = req.body; 

    fs.writeFile("database.json", JSON.stringify(database , null,2),function(err){
        return res.redirect("/todo")
    })

    

    

} )

app.listen(3333 , console.log("server ok"))
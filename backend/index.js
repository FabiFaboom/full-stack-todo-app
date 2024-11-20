
// importing using common js
const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require('mongoose');


const app = express();

// setting up middlewear  // assigned to express library 

app.use(express.json())                             // server must send respons in form of a JSON file
app.use(express.urlencoded({extended: true}))        // when we send html file - make sure server understands this when sending html to server


app.use(cors("*"));                                 // authorisation that gives permission as to who can access back end - * is wild card meaning anyone has access

dotenv.config();

//Importing model
const TodoModel = require("./model/Todo");          // name of the model folder (model) and name of the js file (Todo)



const connectionString = `mongodb+srv://lueber14:${process.env.PASSWORD}@cluster0.zlqxj.mongodb.net/todoDB`; //we added name of the database at the end of trhe string

mongoose.connect(connectionString).then(() => {
    console.log("Connected to the database");
    app.listen(3000, function(){
        console.log("Server running at port 3000");  //best to put inside the connection to MongoDB database because there is no point in connecting to server if database is not working
    })
}).catch((err) => console.log(err))



// CRUD Operations

//get method - read method Todos
app.get("/todos", async (req, res) => {
    //res.send("Hello Everyone!")
    try{
        const response = await TodoModel.find({})
        console.log(response);

        res.json(response);

    }catch (err) {
        console.log(err);
    }
});






//post method - create method Todos
app.post("/todos", async (req, res) => {
   try{
    console.log(req.body);

    const todo = req.body;

    //add the new item to the database
    const newItem = await TodoModel.create(todo);


    //res.send("Your post method is working");   --> code to test if post request is working
    res.status(200).send("Successful")

   } catch(error) {
    console.log(error);
    res.status(500).send("Server Error")
   }
})










// Delte method Todos
app.delete("/todos/:id", async(req, res) => {
    try {
        let id = req.params.id;

        console.log(id)
        const deletedItem = await TodoModel.deleteOne({
            _id: id  // _id equal to the parameter id
        });

        res.status(200).send("Delete Successful")

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
})








// Put method Todos

app.put("/todos/:id", async(req, res, ) => {
    try {
        const id = req.params.id;
        console.log(id);

        
        const { text } = req.body;   //{text} is new text that we send
        
        const updateOptions = {text: text};  // new text should update "text" - see schema in model
        const updateItem = await TodoModel.findByIdAndUpdate(id, updateOptions);

        res.status(200).send("Updated item")


    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
})
//For the express server to connect to the Database,MongoDB uses a layer[ODM] in b/w called mongoose

const mongoose = require('mongoose');       

mongoose.connect('mongodb://localhost/todo_list_db'); //this is how mongoose connects to To-Do List database

const db = mongoose.connection; //checking if mongoose has connected to the database or not
                                // 'db' is the connection between 'mongoose' and the database

db.on('error',console.error.bind(console,"Error connecting to db"));  //connection error

//For successful connection,
db.once('open' , function(){
    console.log("Successfully connected to the database");
});
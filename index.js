const express = require('express');
const port  = 8000;                   //Set up the port on which application will run

const db = require('./config/mongoose'); 
const Todo = require('./models/todo');  //requiring the schema of To-Do-List from todo.js

const app = express();                //'app' has all functionalities of express needed to fire up our server

app.use(express.urlencoded());        //app.use() signifies that it's a middleware 
                                      //express.urlencoded() parses the form data sent as urlencoded bodies inside request object to- key and value pairs inside a sub-object inside request object named request.body
app.use(express.static('assets'));    //to access static files consisting of images & CSS/JS files
app.set('view engine', 'ejs');
app.set('views', './views');     //views is the folder where our all web pages will be kept
 

/*
var todolist = [
  {
    task : "Celebrate graduation",
    due_date : 'NOV 15, 2022',
    category : "OTHER"
  },
  {
    task : "Finish Geometry Home-Work",
    due_date : 'OCT 12, 2021',
    category : "SCHOOL"
  },
  {
    task : "Drop brother in school auditorium",
    due_date : 'DEC 1, 2021',
    category : "WORK"
  }
];
*/

app.get('/', function(req, res){
    // return res.render('home', {title: 'My To Do List', to_do_list: todolist });

    //Todo is the Schema & tasks is the collection
    Todo.find({}, function (err, tasks) {             
      if(err)
      {
        console.log('Error in fetching tasks from database');
        return;
      }
      return res.render('home', { title: "My To Do List", to_do_list: tasks });  
                        //render 'home.ejs' web-page for root-route i.e., '/'
   }); 

});

app.post('/new-task',function(req, res){
  // console.log(req.body.due_date);
  function formatDate(date)                 //converts ISO format date to required long format 
  {
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return monthNames[monthIndex].toUpperCase() + ' ' +day + ', ' + year;
  }

  var exp_date = new Date(req.body.due_date);

  // todolist.push({
  //   task : req.body.task,
  //   due_date : formatDate(exp_date),
  //   category : req.body.category
  // });


/* create() -
   Schema required above creates a new document into the existing collection
   The new document has it's field values from the req.body object                */
  Todo.create({                         
    task : req.body.task,
    due_date : formatDate(exp_date),
    category : req.body.category
 }, function (err, newTodo) {        //newTodo is the new document created inside the collection
     if(err) 
     {
       console.log('error in creating a task!');
       return;
     }

    //  console.log('*******',newTodo);
     return res.redirect('/');                      //redirected to the home page after successful creation of new Document inside existent collection
 });

});



app.post('/task-done/',function(req, res){
  // console.log(req.body);   
  
//req.body contains {_id,'on'} => _id are the unique id's of those document(s) that have been marked[denoted by 'on'] before clicking DELETE TASK button
//Object.keys stores all such id(s) in an array
  Object.keys(req.body).forEach(function(id) 
  {
    console.log(id);
    Todo.findByIdAndDelete(id, function(err) {     //Any document with that id is deleted from the collection in the database
      if(err)
      {
        console.log('error in deleting an object from database');
        return;
      }
      return res.redirect('/');                   //redirected to the home page after successful deletion

    });
  });
});


app.listen(port, function(err){      //server listens to requests on port no. and sends responses
    if(err)
    {
      console.log('Error in running the server', err);
      return;
    }
    console.log('Yup! My Express server is running on Port: ', port);
});
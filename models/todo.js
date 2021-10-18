const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    due_date: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});   //Schema for To-Do List

const Todo = mongoose.model('Todo', todoSchema);     //When you call mongoose.model() on a schema, Mongoose compiles a model for you.
                                                              //.model() function makes a copy of schema.               

module.exports = Todo; //to export the created copy of schema to index.js
const {ObjectID} = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todos } = require('../server/models/todo');
const { Users } = require('../server/models/user');



// var id='5d91af5b1db5dc0fa8e5d3b2';

// Todos.find({
//     _id:id
// }).then((todos)=>{
//     console.log('Todos', todos);
// });

// Todos.findOne({
//     _id:id
// }).then((todo)=>{
// console.log('Todo', todo);
// });

Todos.findById('5d91b0882c3ea629ec9c5ec7').then((todo)=>{
    if(!todo){
        return console.log('ID not found');
    }
    console.log(JSON.stringify(todo, undefined, 2));
    }).catch((e) => console.log(e));
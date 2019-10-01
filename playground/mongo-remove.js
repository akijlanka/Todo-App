const { ObjectId } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todos } = require('../server/models/todo');
const { Users } = require('../server/models/user');

// remove everything

// Todos.remove({}).then((result) =>{
//     console.log(result);
// });

Todos.findByIdAndRemove('5d91af5b1db5dc0fa8e5d3b2').then((todo) => {
    console.log(todo);
});
const {MongoClient, objectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect Mogodb server');
    }
    console.log('connect to Mogodb server');

// delete Many

// db.collection('Todos').deleteMany({text:'Eat'}).then((result) =>{
//     console.log('Delete')
// });
// delete One 

// db.collection('Todos').deleteOne({text:'Eats'}).then((result) =>{
//     console.log(result);
// });
// find One And Delete 
db.collection('Todos').findOneAndDelete({text:'Geting to do'}).then((result) =>{
    console.log(result);
});

    db.close();
});

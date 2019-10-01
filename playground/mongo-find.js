const {MongoClient, objectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect Mogodb server');
    }
    console.log('connect to Mogodb server');

    // db.collection('Todos').find({completed: false}).toArray().then((docs) =>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) =>{
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Todos').find().count().then((count) =>{
            console.log(`Todos ${count}`);
        }, (err) =>{
            console.log('Unable to fetch todos', err);
        });
   
    db.close();
});

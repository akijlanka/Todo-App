var express = require('express', { useUnifiedTopology: true });
var bodyParser = require('body-parser', { useUnifiedTopology: true });
var { ObjectId } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todos } = require('./models/todo');
var { Users } = require('./models/user');



var app = express();
const port = process.env.PORT || 3000;


// POST to Todos

app.use(bodyParser.json());
app.post('/todos', (req, res) => {
    var newtodo = new Todos({
        text: req.body.text
    });
    newtodo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todos.find().then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET to Todos

app.get('/todos/:id', (req, res) => {
    // res.send(req.params);
    // console.log('ObjectID', ObjectId)
    var id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    Todos.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
});

// Delete to Todos

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    Todos.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send(todo);
    }).catch((e) => {
        res.status(400).send();
    });
});

// Make Port Todos

app.listen(port, () => {
    console.log(`Start Port ${port}`);
});

module.exports = { app };
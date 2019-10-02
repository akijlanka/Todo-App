const _ = require('lodash');
const express = require('express', { useUnifiedTopology: true });
const bodyParser = require('body-parser', { useUnifiedTopology: true });
const { ObjectId } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todos } = require('./models/todo');
const { Users } = require('./models/user');
const { authenticat } = require('./middleware/authenticat');



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


// GET to Todos
app.get('/todos', (req, res) => {
    Todos.find().then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    });
});



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

// Update to todos

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getDate();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todos.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(404).send();
    })
});


// POST / Users

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new Users(body);

    user.save().then(() => {
        // console.log('newUser', newUser)
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});


app.get('/users/me', authenticat, (req, res) => {
    res.send(req.user);
});

// POST /user login {email, password}
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    // res.send(body);
    Users.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.headers('x-auth', token).send(user);
        }); 
    }).catch((e) => {
        res.status(400).send();
    });
});

// Make Port Todos

app.listen(port, () => {
    console.log(`Start Port ${port}`);
});

module.exports = { app };
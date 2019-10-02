// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
// // mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://newUser:newUser123@cluster0-ctd00.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });
// module.exports = { mongoose };

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

module.exports = {mongoose};

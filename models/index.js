var mongoose = require('mongoose');
mongoose.set('debug', true);

const mongooseOptions = {
    useNewUrlParser: true
}

mongoose.connect('mongodb://localhost:27017/todo-api', mongooseOptions);
mongoose.Promise = Promise;

module.exports.Todo = require('./todo');
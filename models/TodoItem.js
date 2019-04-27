const mongoose = require('mongoose');

const TodoItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    }

})
const TodoItem = mongoose.model('todo-items', TodoItemSchema)

module.exports = TodoItem
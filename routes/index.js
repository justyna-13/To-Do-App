const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const Todo = require('../models/TodoItem');

router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', (req, res) => res.render('login'));

var userEmail;

router.get('/dashboard', (req, res) => {
    try {
        userEmail = req.user.email
        Todo.find({userEmail: userEmail}, (err, todoList) => {
            if(err)
                console.log(err)
            else {
                res.render('dashboard', {todoList: todoList})
            }
        })
    }
    catch {
        res.send("<h1>Permission denied</h1>")
    }
});

router.post('/addtask', (req, res) => {
    if(req.body.newtask) {
        const newTask = new Todo({
            name: req.body.newtask,
            userEmail: userEmail
        });
        Todo.create(newTask, (err, Todo) => {
            if(err)
                console.log(err)
        })
    }
    res.redirect("/dashboard")
})

router.post('/removetask', (req, res) => {
    Todo.findByIdAndRemove(req.body.removetask, (err, task) => {
        if(err)
            console.log(err)
    })
    res.redirect("/dashboard")
})

module.exports = router;
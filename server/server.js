const express = require('express');
const bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();

// using a middleware for parsing the body... string form client to JSON while sending to the server
app.use(bodyParser.json())


//setting up the POST request
app.post('/todos', (req, res) => {
  let newTodo = new Todo({
    text: req.body.text
  })

  newTodo.save().then((doc) => {
    res.send(doc)
  }, (err) => {
    res.status(400).send(err);
  })
})

//setting up the GET request
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e)
  })
})


app.listen(3000, () => {
  console.log("server started")
})
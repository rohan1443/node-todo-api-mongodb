const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

let { mongoose } = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { User } = require('./models/user');

let app = express();
const port  = process.env.PORT || 3000;

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
    res.send({ todos })
  }, (e) => {
    res.status(400).send(e)
  })
})

//setting a GET request by id
app.get('/todos/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send()
  }

  Todo.findById(req.params.id).then((todo) => {
    if (!todo) {
      return res.status(404).send({})
    }
    res.send({todo})
  }).catch((e) => {
    res.status(400).send()
  })

})


app.listen(port, () => {
  console.log(`Started the server on port ${port}`)
})
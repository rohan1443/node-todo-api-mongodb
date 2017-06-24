const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const _ = require('lodash');

let { mongoose } = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { User } = require('./models/user');
let { authenticate } = require('./middleware/authenticate');

let app = express();
const port = process.env.PORT || 3000;

// using a middleware for parsing the body... string form client to JSON while sending to the server
app.use(bodyParser.json())

//Setting up the POST request for USER
app.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password'])
  let user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken()
  }).then((token) => {
    res.header('x-auth', token).send(user)
  }, (err) => {
    res.send(err)
  }).catch((e) => {
    res.status(400).send(e)
  })

  // newUser.save().then((doc) => {
  //   res.status(200).send(doc)
  // }).catch((e) => {
  //   res.status(400).send(e)
  // })
})

//setting up a private route and middleware
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user)
})


//setting up the POST request for TODO
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
    res.send({ todo })
  }).catch((e) => {
    res.status(400).send()
  })
})

//Setting up a DELETE request by id
app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send()
  }
  Todo.findByIdAndRemove(id).then((doc) => {
    if (!doc) {
      return res.status(404).send()
    }
    res.status(200).send({ doc });
  }).catch((e) => {
    res.status(400).send();
  })
})

//Setting up PATCH to update any document
app.patch('/todos/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed'])

  if (!ObjectId.isValid(id)) {
    return res.status(404).send()
  }

  if (body.completed && _.isBoolean(body.completed)) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
    if (!todo) {
      return res.status(404).send()
    }
    res.status(200).send({ todo })
    debugger;
  }).catch((e) => {
    res.status(400).send()
  })

})



app.listen(port, () => {
  console.log(`Started the server on port ${port}`)
})
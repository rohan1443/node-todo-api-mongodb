const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp')

var User = mongoose.model("user", {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
})

let newUser = new User({
  email: 'rohan1443@gmail.com'
})

newUser.save().then((doc) => {
  console.log(doc)
}, (err) => {
  console.log('Unable to save', err)
})

//creating the constructor
//mongoose validators and schemas
var Todo = mongoose.model("Todo", {
  text :{
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
})

//creating an instance... so called the collection
// let newTodo = new Todo({
//   text: 'Cook dinner'
// })

// newTodo.save().then((doc) => {
//   console.log('Saved Todo', doc)
// }, (err) => {
//   console.log('Unable to save Todo')
// })

// let otherTodo = new Todo({
//   text: 'Feeling Sleepy'
// })

// otherTodo.save().then((newDoc)=> {
// console.log(newDoc)
// }, (err) => {
//   console.log("Unable to save", err)
// })

mongoose.connection.close()
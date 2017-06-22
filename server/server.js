const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp')


//creating the constructor
var Todo = mongoose.model("Todo", {
  text :{
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
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

let otherTodo = new Todo({
  text: 'My name is Rohan',
  completed: true,
  completedAt: 123
})

otherTodo.save().then((newDoc)=> {
console.log(newDoc)
}, (err) => {
  console.log("Unable to save")
})

mongoose.connection.close()
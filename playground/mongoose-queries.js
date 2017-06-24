const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectId} = require('mongodb');


let id = '594dd7d310e0390855b07f64';

if(!ObjectId.isValid(id)) {
  console.log('Invalid Id')
}

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log({todos})
// })

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log({todo})
// })

Todo.findById(id).then((todo)=> {
  console.log("Find by Id", todo)
}).catch((e) => {
  console.log(e)
})
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectId} = require('mongodb');


let id = '594dd7d310e0390855b07f64';

if(!ObjectId.isValid(id)) {
  console.log('Invalid Id')
}

//remove()
Todo.remove({}).then(() => {
  console.log("removed all the docs")
}).catch((e) => {
  console.log(e)
})

//findOneAndRemove

//findByIdAndRemove
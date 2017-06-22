//let MongoClient = mongodb.MongoClient;
//destructuring
const mongodb = require('mongodb');
let { MongoClient, ObjectID } = mongodb;


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to the MongoDB Server')
  }

//delete Many
// db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result) => {
//   console.log(result)
// })

//delete One
// db.collection('Todos').deleteOne({completed: false}).then((result) => {
//    console.log(result)
// })

//find and delete one >> basically deletes and returns back the object
// db.collection('Todos').findOneAndDelete({completed: true}).then((result) => {
//  console.log(result) 
// })

//deleting from Users collection
db.collection('Users').findOneAndDelete({_id: ObjectID("594817b15ae50d074aee3e95")}).then((result) => {
  console.log(result)
})

 db.close();

})
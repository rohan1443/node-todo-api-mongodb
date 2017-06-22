//let MongoClient = mongodb.MongoClient;
//destructuring
const mongodb = require('mongodb');
let { MongoClient, ObjectID } = mongodb;


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to the MongoDB Server')
  }

db.collection('Users').find({name: 'Rahul'}).toArray().then((list) => {
  console.log(list)
}, (err) => {
  console.log('Unable to find the list', err)
})


// db.collection('Todos').find({_id: new ObjectID('59481514e7dc39072131beba')}).toArray().then((docs) => {
//   console.log('Todos')
//   console.log(docs)
// }, (err) => {
//    console.log("unable to fetch Todos", err) 
// }) 
 
 //can use either the callback function or the promise functional approach
//  db.collection('Todos').find().count().then((count) => {
//   console.log('Todos count')
//   console.log(`${count}`)
// }, (err) => {
//    console.log("unable to fetch Todos", err) 
// }) 
 

  db.close();

})
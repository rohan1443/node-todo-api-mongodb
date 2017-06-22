//let MongoClient = mongodb.MongoClient;
//destructuring
const mongodb = require('mongodb');
let { MongoClient, ObjectID } = mongodb;

//creating custom ObjectId's and using it wherever required
// let objID = new ObjectID();
// console.log(objID)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to the MongoDB Server')
  }
  console.log('connected to the MongoDB server')


  // to list all the databses and running as an admin
  // let adminDB = db.admin();
  // adminDB.listDatabases((err, dbs) => {
  //   if (err) {
  //     return console.log("cannot access the database", err)
  //   }
  //   console.log(dbs.databases)
  // })


  // db.collection('Todos').insertOne({
  //   text: 'something to do',
  //   completed: false
  // }, (err, result) => {
  //   if(err){
  //     return console.log('Unable to insert Todo', err)
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2))
  // }) 

  // db.collection('Users').insertOne({
  //   name: 'Rohan',
  //   age: 29,
  //   location: 'Gurgaon, India'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unabel to connect to the MongoDB server')
  //   }
  //   console.log(result.ops[0]._id.getTimestamp())
  // })

  db.close();

})
const mongodb = require('mongodb');

let MongoClient = mongodb.MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to the MongoDB Server')
  }
  console.log('connected to the MongoDB server')
  
  db.collection('Todos').insertOne({
    text: 'something to do',
    completed: false
  }, (err, result) => {
    if(err){
      return console.log('Unable to insert Todo', err)
    }

    console.log(JSON.stringify(result.ops, undefined, 2))
  })
  
  db.close();

})
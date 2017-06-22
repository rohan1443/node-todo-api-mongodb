const mongoDB = require('mongodb');
const { MongoClient, ObjectID } = mongoDB;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log("cannot connect to the database")
  }

  console.log("connected to the mongoDB server")

  // db.collection('Todos')
  //   .findOneAndUpdate(
  //   { _id: ObjectID("594bd1a96b7cacf27ab5e554") }, //filter by
  //   {
  //     $set: {
  //       completed: true //update using MongoDB update operator
  //     }
  //   },
  //   {
  //     returnOriginal: false
  //   }).then((result) => {
  //   console.log(result)
  // })

  db.collection("Users").findOneAndUpdate({_id: ObjectID("59493f2c92b5090907712b2a")},{
    $set: {
      name: "Rahul Mazumdar"
    },
    $inc: {
      age: 7
    },
  },
  {
    returnOriginal : false
  }).then((result) => {
    console.log(result)
  })


  db.close();
})
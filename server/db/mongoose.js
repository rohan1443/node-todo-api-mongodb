const mongoose = require('mongoose');

//MONGODB_URI = "mongodb://heroku_d9ln7rg5:9iin7htfc213566pclu6n49b85@ds135382.mlab.com:35382/heroku_d9ln7rg5"

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose}
//const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 20
}

var token = jwt.sign(data, 'Hello Rohan');
console.log(token)

var decoded = jwt.verify(token, 'Hello Rohan');
console.log(decoded)
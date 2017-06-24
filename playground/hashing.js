//const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// var data = {
//   id: 20
// }

// var token = jwt.sign(data, 'Hello Rohan');
// console.log(token)

// var decoded = jwt.verify(token, 'Hello Rohan');
// console.log(decoded)


var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash)
//   })
// })

// var hashed = '$2a$10$XCmhg3T2S1Pgwxvk8jYqZ.kYuf/VoG71l4QJtX1eXkRPFkR38IE8y'

// bcrypt.compare(password, hashed, (err, result) => {
//   console.log(result)
// })
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
let JWT_SECRET = process.env.JWT_SECRET || 'abcd1234'

var UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: (value) => {
        validator.isEmail(value)
      },
      message: '{VALUE} is not a valid email address'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({ _id: user._id.toHexString(), access }, JWT_SECRET).toString();

  user.tokens.push({ access, token })

  return user.save().then(() => {
    return token
  })
}

UserSchema.methods.removeToken = function(token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: {token}
    }
  })
}

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, JWT_SECRET)
  } catch (error) {
    // return new Promise((resolve, reject) => {
    //   reject();
    // })
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}

UserSchema.statics.findByCredentials = function(email, password) {
  var User = this;

  return User.findOne({email}).then((user) => {
  if(!user){
    return Promise.reject();
  }  

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, res) => {
      if(res) {
        resolve(user)
      }else {
        reject()
      }
    })
  })

  })
}

UserSchema.pre('save', function(next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next()
      })
    })
  } else {
    next()
  }

})

var User = mongoose.model("user", UserSchema)

module.exports = { User };


//sample email and password object 
// {
//   email: 'rohan1443@example.com',
//   password: 'nefjcevkw4metq3fkowetjierhvrmsmcwe',
//   tokens:[{
//     type: 'auth',
//     token: 'denenvneknfkvnsdnfsdcknaskerjvbrwhdsb',
//   }]
// }
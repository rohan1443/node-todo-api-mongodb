const mongoose = require('mongoose');

//creating the constructor
//mongoose validators and schemas
var Todo = mongoose.model("Todo", {
  text :{
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
})

module.exports = {Todo};
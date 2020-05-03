const mongoose = require('mongoose');

const Schema = mongoose.Schema


const UsersSchema = new Schema({
  firstName: {
    type: String, 
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

mongoose.model('StrategyTwo', UsersSchema);
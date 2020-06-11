const mongoose = require('mongoose');

const Schema = mongoose.Schema

// Create the Users Schema
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
  },
  confirmPassword: {
    type: String,
    require: true
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

mongoose.model('StrategyTwo', UsersSchema);
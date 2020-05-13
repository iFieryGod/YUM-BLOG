const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;

// Create Schema
const BlogPostSchema = new Schema({
  title:{
    type: String,
    required: true
  }, 
  comment:{
    type: String, 
    required: true
  },
  image:{
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('StrategyOne', BlogPostSchema);
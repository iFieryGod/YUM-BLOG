const mongoose = require('mongoose');

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
    type: Buffer
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
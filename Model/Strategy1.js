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
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('StrategyOne', BlogPostSchema);
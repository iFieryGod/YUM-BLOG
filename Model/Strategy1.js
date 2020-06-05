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
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

mongoose.model('StrategyOne', BlogPostSchema);
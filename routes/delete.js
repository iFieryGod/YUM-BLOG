const express = require('express');
const mongoose = require('mongoose');

// DB Config
const db = require('../config/database');

// Connect to Mongoose
mongoose.connect(db.mongoURI, {
  useNewUrlParser: true
});

// Load Strategies Model
require('../Model/Strategy1');
require('../Model/Strategy2');
const Strategy1 = mongoose.model('StrategyOne');
const Strategy2 = mongoose.model('StrategyTwo');

const router = express.Router();
module.exports = router;

// Render Posts
router.get('/post', (req, res) => {
  const title = 'Post'
  Strategy1.find({}).lean()
  .sort({Date: 'desc'})
  .then(Strategy1 => {
    res.render('post', {
      title: title, 
      Strategy1:Strategy1,
      layout2: true
    });
  })
  .catch(() => {
    res.status(500)
  })
});

router.delete('/post/delete/:id', (req, res) => {
  Strategy1.deleteOne({
    _id: req.params.id
  })
  .then(() => {
   req.flash('success_msg', 'Post Deleted') 
   res.redirect('/post')
   })
   .catch(() => {
     res.status(500)
   })
 });

//  Render Users
 router.get('/users', (req, res) => {
  const title = 'Users'
  Strategy2.find({}).lean()
  .sort({Date: 'desc'})
  .then(Strategy2 => {
    res.render('users', { 
      title: title,
      Strategy2: Strategy2,
      layout2: true
    });
  })
  .catch(() => {
    res.status(500)
  })
});

router.delete('/users/delete/:id', (req, res) => {
  Strategy2.deleteOne({
    _id: req.params.id
  })
  .then(() => {
    req.flash('success_msg', 'Successfully Deleted')
    res.redirect('/users')
  })
  .catch(() => {
    res.status(500)
  })
});
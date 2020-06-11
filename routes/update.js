const express = require('express');
const mongoose = require('mongoose');
const {ensureAuthenticated} = require('../helpers/auth');

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

// Get a single post by its ID
router.get('/post/edit/:id', ensureAuthenticated, (req, res) => {
  const title = 'Edit Post'
  let username = req.user.firstName
  Strategy1.findById({
    _id: req.params.id
  }).lean()
  .then(post => {
    if(post.user != req.user._id){
      req.flash('error', 'Not Authorized')
      res.redirect('/post')
    } else {
        res.render('postEdit', {
      post: post,
      title: title,
      Strategy1:Strategy1,
      username: username,
      layout2: true
    });  
    }
  })
  .catch(() => {
    res.status(500)
  })
});
// Update the post with the given ID and save the changes to MongoDB
router.put('/post/:id', ensureAuthenticated, (req, res) => {
  Strategy1.findOne({
    _id: req.params.id
  })
  .then(post => {
    post.comment = req.body.editor1,
    post.title = req.body.title
    if(req.file){
      post.image = req.file
    }
    post.save()
    .then(() => {
      req.flash('success_msg', 'Successfully Updated')
      res.redirect('/post')
    });
  })
  .catch(() => {
    res.status(500)
  })
});
// Get a single user object from mongoDB
router.get('/users/edit/:id', ensureAuthenticated, (req, res) => {
  const title = 'Edit User'
  let username = req.user.firstName
  Strategy2.findById({
    _id: req.params.id
  }).lean()
  .then(user => {
    res.render('userEdit', {
      user: user, 
      title: title,
      username: username,
      layout2: true
    });
  })
  .catch(() => {
    res.status(500)
  })
});
// Update the user information with the provided ID ans save the changes to MongoDb
router.put('/users/:id', ensureAuthenticated, (req, res) => {
  Strategy2.findOne({
    _id: req.params.id
  })
  .then(user => {
    user.firstName = req.body.name,
    user.emailAddress = req.body.email
    user.save()
    .then(() => {
      req.flash('success_msg', 'Successfully Updated')
      res.redirect('/users')
    })
    .catch(() => {
      res.status(500)
    })
  })
  .catch(() => {
    res.status(500)
  })
});
const express = require('express');
const mongoose = require('mongoose');
const {ensureAuthenticated} = require('../helpers/auth')

// Connect to Mongoose
mongoose.connect('mongodb://localhost/Yummy', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(() => console.log('MongoDB connected'))
.catch(Error => console.log(Error));

// Load Strategies Model
require('../Model/Strategy1');
require('../Model/Strategy2');
const Strategy1 = mongoose.model('StrategyOne');
const Strategy2 = mongoose.model('StrategyTwo');

const router = express.Router();
module.exports = router;

router.get('/post/edit/:id', ensureAuthenticated, (req, res) => {
  const title = "Edit Post"
  Strategy1.findById({
    _id: req.params.id
  }).lean()
  .then(post => {
    res.render('postEdit', {
      post: post,
      title: title,
      layout2: true
    });
  });
});

router.put('/post/:id', ensureAuthenticated, (req, res) => {
  Strategy1.findOne({
    _id: req.params.id
  })
  .then(post => {
    post.comment = req.body.editor1,
    post.title = req.body.title

    post.save()
    .then(() => {
      req.flash('success_msg', 'Successfully Updated')
      res.redirect('/post')
    });
  });
});

router.get('/users/edit/:id', ensureAuthenticated, (req, res) => {
  const title = "Edit User"
  Strategy2.findById({
    _id: req.params.id
  }).lean()
  .then(user => {
    res.render('userEdit', {
      user: user, 
      title: title,
      layout2: true
    });
  });
});

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
    });
  });
});
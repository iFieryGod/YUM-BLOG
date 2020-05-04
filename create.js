const express = require('express');
const mongoose = require('mongoose');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/Yummy', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(() => console.log('MongoDB connected'))
.catch(Error => console.log(Error));

// Load Strategies Model
require('./Model/Strategy1');
require('./Model/Strategy2');
const Strategy1 = mongoose.model('StrategyOne');
const Strategy2 = mongoose.model('StrategyTwo');
const router = express.Router();
module.exports = router;

// Process Post Form
router.post('/post', (req, res) => {
  let errors = [];

  if(!req.body.title){
    errors.push({text: 'Please add a title'})
  }
  if(!req.body.editor1){
    errors.push({text: 'Please add some comments'})
  }
  if(errors.length > 0){
    res.render('/post', {
      errors: errors,
      title: req.body.title,
      comment: req.body.editor1
    });
  } else{
    let newPost = {
      title: req.body.title,
      comment: req.body.editor1
    }
    new Strategy1(newPost)
    .save()
    .then(Strategy1 => {
      req.flash('success_msg', 'Added Successfully');
      res.redirect('/post');
    });
    }
});

// Process sign-up form
router.post('/sign-up', (req, res) => {
  let errors = [];

  if(!req.body.firstName){
    errors.push({text: 'Please add your First Name'})
  }
  if(!req.body.lastName){
    errors.push({text: 'Please add your Last Name'})
  }
  if(!req.body.emailAddress){
    errors.push({text: 'Please add an Email Address'})
  }
  if(!req.body.password){
    errors.push({text: 'Please add a Password'})
  }
  if(errors.length > 0){
    res.render('/post', {
      errors: errors,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailAddress: req.body.emailAddress,
      password: req.body.password
    });
  } else {
    let newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailAddress: req.body.emailAddress,
      password: req.body.password
    }
    new Strategy2(newUser)
    .save()
    .then(Strategy2 => {
      req.flash("success_msg", "You have successfully created a user account. Go on and login!")
      res.redirect('/login');
    });
    }
});

// Process login form and validation
router.post('/login', (req, res) => {
  const title = "Login"
  let errors = [];

  if(!req.body.email){
    errors.push({text: 'Please enter your email address'})
  }
  if(!req.body.password){
    errors.push({text: 'Please enter your password'})
  }
  if(errors.length > 0){
    res.render('login', {
      title: title,
      login: true,
      errors: errors,
      email: req.body.email,
      password: req.body.password
    });
  }
});
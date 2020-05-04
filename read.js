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

// Render the post form
router.get('/post', (req, res) => {
  const title = "Post"
  Strategy1.find({}).lean()
  .sort({Date: 'desc'})
  .then(Strategy1 => {
    res.render('post', {
      title: title, 
      Strategy1:Strategy1,
      layout2: true
    });
  });
});

// Render the users page
router.get('/users', (req, res) => {
  const title = "Users"
  Strategy2.find({}).lean()
  .sort({Date: 'desc'})
  .then(Strategy2 => {
    res.render('users', { 
      title: title,
      Strategy2: Strategy2,
      layout2: true
    });
  });
});

// Render Login Page
router.get('/login', (req, res) => {
  const title = "Login"
  res.render('login', { 
    title: title,
    login: true
  });
});

// Render the sign-up form
router.get('/sign-up', (req, res) => {
  const title = "Sign Up"
  res.render('signUp', { 
    title: title,
    layout1: true
  });
});

// Render the Blog page
router.get('/blog', (req, res) => {
  const title = "Blog"
  res.render('blog-post', {
    title: title,
    layout3: true
  });
});


const express = require('express');
const mongoose = require('mongoose');
const {ensureAuthenticated} = require('../helpers/auth');

// DB Config
const db = require('../config/database');

// Connect to Mongoose
mongoose.connect(db.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// Load Strategies Model
require('../Model/Strategy1');
require('../Model/Strategy2');
const Strategy1 = mongoose.model('StrategyOne');
const Strategy2 = mongoose.model('StrategyTwo');

const router = express.Router();
module.exports = router;

// Render the index page
router.get('/', async (req, res) => {
  await Strategy1.find({}).limit(3).lean()
  .then(Strategy1 => {
    res.render('index', {
    Strategy1: Strategy1,
    layout3: true
  });
  })
  .catch((err) => {
    console.log(err)
  }) 
});

// Render the post form
router.get('/post', ensureAuthenticated, (req, res) => {
  const title = 'Post'
  Strategy1.find({user: req.user.id}).lean()
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
router.get('/users', ensureAuthenticated, (req, res) => {
  const title = 'Users'
  Strategy2.find({_id: req.user.id}).lean()
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
  const title = 'Login'
  res.render('login', { 
    title: title,
    login: true
  });
});

// Render the Blog page
router.get('/blog', (req, res) => {
  const title = 'Blog'
  Strategy1.find({}).lean()
  .sort({Date: 'desc'})
  .then(Strategy1 => {
    res.render('blog-post', {
      title: title, 
      Strategy1:Strategy1,
      layout3: true
    });
  });
});

// SignUp for validation
router.get('/sign-up', (req, res) => {
  const title = 'Sign UP'
  res.render('sign-up', { 
    title: title,
    login: true
  });
});


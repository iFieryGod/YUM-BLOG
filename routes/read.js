const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');
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

// Render the index page and get three posts from mongDB and render in index page
router.get('/', (req, res) => {
  Strategy1.find({}).limit(3).lean()
  .then(Strategy1 => {
    let updated = Strategy1.map(e => e.updated_at)
    res.render('index', {
    updated: updated,  
    Strategy1: Strategy1,
    layout3: true
  });
  })
  .catch(() => {
    res.status(500)
  }) 
});

// get a user object from mongodb by ID and render in the post form
router.get('/post', ensureAuthenticated, (req, res) => {
  const title = 'Post'
  let username = req.user.firstName
  Strategy1.find({user: req.user.id}).lean()
  .sort({Date: 'desc'})
  .then(Strategy1 => {
    res.render('post', {
      title: title, 
      Strategy1:Strategy1,
      username: username,
      layout2: true
    });
  })
  .catch(() => {
    res.status(500)
  })
});

// get a user object from mongodb based on their user_id and render in the users page
router.get('/users', ensureAuthenticated, (req, res) => {
  const title = 'Users'
  let username = req.user.firstName
  Strategy2.find({_id: req.user.id}).lean()
  .sort({Date: 'desc'})
  .then(Strategy2 => {
    res.render('users', { 
      title: title,
      Strategy2: Strategy2,
      username: username,
      layout2: true
    });
  })
  .catch(() => {
    res.status(500)
  })
});

// Render Login Page
router.get('/login', (req, res) => {
  const title = 'Login'
  res.render('login', { 
    title: title,
    login: true
  });
});

// get all posts in the mongoDB and render in the Blog page
router.get('/blog', (req, res) => {
  const title = 'Blog'
  if(req.user === undefined){
    Strategy1.find({}).lean()
      .sort({Date: 'desc'})
      .then(Strategy1 => {
        res.render('blog-post', {
        title: title, 
        Strategy1:Strategy1,
        layout3: true
      });
      })
      .catch(() => {
      res.status(500)
      })

  } else {
     let username = req.user.firstName
     Strategy1.find({}).lean()
      .sort({Date: 'desc'})
      .then(Strategy1 => {
        res.render('blog-post', {
        title: title, 
        Strategy1:Strategy1,
        username: username,
        layout3: true
      });
      })
      .catch(() => {
      res.status(500)
      })
    }
});

// render the sign page
router.get('/sign-up', (req, res) => {
  const title = 'Sign UP'
  res.render('sign-up', { 
    title: title,
    login: true
  });
});


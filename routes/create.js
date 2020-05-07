const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const router = express.Router();
// Multer and Crypto Middleware
// Multer diskstorage allows to specify an upload location.
// Crypto allows us to generate a random name for the image.
const fileStorage = multer.diskStorage({
  destination: "/uploads",
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      if (err) return callback(err);
      cb(null, raw.toString('hex') + path.extname(file.originalname));
    });
  }
});

const fileFilter = (req, file, cb) => {
  if (
    !file.mimetype.includes("jpeg") &&
    !file.mimetype.includes("jpg") &&
    !file.mimetype.includes("png") &&
    !file.mimetype.includes("gif") ||
    file.mimetype === undefined
  ) {
    return cb(null, false, new Error("Only images are allowed"));
  }
  cb(null, true);
}

// Multer Middleware for single image upload
router.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));

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

// Process Post Form
router.post('/post', (req, res) => {
   
 let errors = [];

  if(!req.body.title){
    errors.push({text: 'Please add a title'})
  }
  if(!req.body.editor1){
    errors.push({text: 'Please add some comments'})
  }
  if(!req.file){
    res.status (422).render('post', {
      title: req.body.title,
      layout2: true,
      errors: errors
    })
    errors.push({text: 'Please add an image file'})
  }
  if(errors.length > 0){
    res.render('post', {
      errors: errors,
      title: req.body.title,
      comment: req.body.editor1,
      image: req.file.path,
      layout2: true
    });
  } else{
    let newPost = {
      title: req.body.title,
      comment: req.body.editor1,
      user: req.user.id,
      image: req.file.path,
      username: req.user.firstName
    }
    new Strategy1(newPost)
    .save()
    .then(() => {
      req.flash('success_msg', 'Added Successfully');
      res.redirect('/post');
    });
    }
  });

// Process sign-up form
router.post('/sign-up', (req, res) => {
  const title = 'Sign Up';
  let errors = [];

  if(!req.body.firstName){
    errors.push({text: 'Please enter your name'});
  }
  if(!req.body.lastName){
    errors.push({text: 'Please enter your last name'});
  }
  if(!req.body.emailAddress){
    errors.push({text: 'Please enter an Email Address'});
  }
  if(req.body.password1 != req.body.password2){
    errors.push({text: 'Passwords do not match'});
  }
  if(req.body.password1.length < 4){
    errors.push({text: 'Passwords must be atleast four characters'});
  }
  if(errors.length > 0){
    res.render('sign-up', {
      title: title,
      login: true,
      errors: errors,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailAddress: req.body.emailAddress,
      password: req.body.password1,
      confirmPassword: req.body.password2
    });
  } else {
    Strategy2.findOne({emailAddress: req.body.emailAddress})
    .then(user => {
      if(user){
        req.flash('error_msg', "email already registered");
        res.redirect('sign-up')
      } else {
        const newUser = new Strategy2({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          emailAddress: req.body.emailAddress,
          password: req.body.password1,
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
          .then(() => {
            req.flash('success_msg', 'You are now registered and can log in');
            res.redirect('login');
            });
          });
          if(err) throw err;
        });
      }
    })
  }
});

// Process login form and validation
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
    successRedirect: "/"
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('success_msg', "You are logged out");
  res.redirect('/login');
});

module.exports = router;
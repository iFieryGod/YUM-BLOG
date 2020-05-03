const express = require('express');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const favicon = require('express-favicon');
const mongoose = require('mongoose');

const app = express();

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

// Static folder with built-in express
app.use(express.static("public"));
app.use(favicon(__dirname + '/public/favicon.ico'));

// Handlebars Middleware
app.engine('handlebars', exphbs( {
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method Override
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  const title = "Welcome"
  res.render('index', { 
    title: title,
    layout3: true
  });
});

app.get('/blog', (req, res) => {
  const title = "Blog"
  res.render('blog-post', {
    title: title,
    layout3: true
  });
});

// Render the post form
app.get('/post', (req, res) => {
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

// Process Form
app.post('/post', (req, res) => {
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
      res.redirect('/post');
    });
    }
});

app.get('/post/edit/:id', (req, res) => {
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

app.put('/post/:id', (req, res) => {
  Strategy1.findOne({
    _id: req.params.id
  })
  .then(post => {
    post.comment = req.body.editor1,
    post.title = req.body.title

    post.save()
    .then(() => {
      res.redirect('/post')
    });
  });
});

app.delete('/post/delete/:id', (req, res) => {
 Strategy1.deleteOne({
   _id: req.params.id
 })
 .then(() => {
  res.redirect('/post')
  });
});

// Render the sign-up form
app.get('/sign-up', (req, res) => {
  const title = "Sign Up"
  res.render('signUp', { 
    title: title,
    layout1: true
  });
});
// Process sign-up form
app.post('/sign-up', (req, res) => {
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
      res.redirect('/login');
    });
    }
});

app.get('/login', (req, res) => {
  const title = "Login"
  res.render('login', { 
    title: title,
    login: true
  });
});

app.post('/login', (req, res) => {
  res.send('ok')
})

app.get('/users', (req, res) => {
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

app.get('/users/edit/:id', (req, res) => {
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

app.put('/users/:id', (req, res) => {
  Strategy2.findOne({
    _id: req.params.id
  })
  .then(user => {
    user.firstName = req.body.name,
    user.emailAddress = req.body.email

    user.save()
    .then(() => {
      res.redirect('/users')
    });
  });
});

app.delete('/users/delete/:id', (req, res) => {
  Strategy2.deleteOne({
    _id: req.params.id
  })
  .then(() => {
    res.redirect('/users')
  });
});

const port = 3000

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
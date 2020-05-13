const express = require('express');
const exphbs = require ('express-handlebars');
const flash = require ('connect-flash');
const session = require ('express-session');
const methodOverride = require ('method-override');
const bodyParser = require('body-parser');
const favicon = require('express-favicon');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

// Load Strategies Model
require('./Model/Strategy1');
require('./Model/Strategy2');
const Strategy1 = mongoose.model('StrategyOne');

// Passport
require('./config/passport')(passport);

// DB Config
const db = require('./config/database');

// Connect to Mongoose
mongoose.connect(db.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(() => console.log('MongoDB connected'))
.catch(Error => console.log(Error));

// Static folder with built-in express
app.use(express.static("public"));
app.use(favicon(__dirname + '/public/favicon.ico'));  

// Handlebars Middleware (template engine)
app.engine('handlebars', exphbs( {
  helpers: require("./helpers/hbs"),
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method Override
// makes the put and delete requests easier
app.use(methodOverride('_method'));

// Express session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Render the index page
app.get('/', (req, res) => {
  const title = "Welcome"
  Strategy1.find({}).limit(3).lean()
  .then(Strategy1 => {
    res.render('index', {
    Strategy1: Strategy1,   
    title: title,
    layout3: true
  });
  })
});

// Bringing in the read routes
const readRouter = require('./routes/read');
app.use(readRouter);

// Bringing in the create routes
const createRouter = require('./routes/create');
app.use(createRouter);

// Bringing in the update routes
const updateRouter = require('./routes/update');
app.use(updateRouter);

// Bringing in the delete routes
const deleteRouter = require('./routes/delete');
app.use(deleteRouter);

// Setting up port access for HEROKU and locally for 3000
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
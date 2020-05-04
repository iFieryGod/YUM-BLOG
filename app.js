const express = require('express');
const exphbs = require ('express-handlebars');
const flash = require ('connect-flash');
const session = require ('express-session');
const methodOverride = require ('method-override');
const bodyParser = require('body-parser');
const favicon = require('express-favicon');

const app = express();

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

// Express session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.get('/', (req, res) => {
  const title = "Welcome"
  res.render('index', { 
    title: title,
    layout3: true
  });
});

const readRouter = require('./read');
app.use(readRouter);

const createRouter = require('./create');
app.use(createRouter);

const updateRouter = require('./update');
app.use(updateRouter);

const deleteRouter = require('./delete');
app.use(deleteRouter);

const port = 3000

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
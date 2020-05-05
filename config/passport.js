const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load user model
const Strategy2 = mongoose.model('StrategyTwo');

module.exports = function(passport){
  passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    // Match the User
    Strategy2.findOne({
      emailAddress: email
    }).then(user => {
      if(!user){
        return done(null, false, {message: 'No user found'});
      }

      // Match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Password incorrect'});
        }
      });
    });
  }));
  passport.serializeUser(function(user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function(id, done) {
  Strategy2.findById(id, function (err, user) {
    done(err, user);
  });
});
}

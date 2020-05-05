module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', "Your Not Authorized");
    res.redirect('/login');
  }
}
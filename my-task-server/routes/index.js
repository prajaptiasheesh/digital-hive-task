var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let user;
  // check if user is logged-in
  if (req.session && req.session.user) {

    user = JSON.parse(req.session.user);
    let redirectURL = '/users/dashboard';
    if (user.role === 'driver') {
      redirectURL = '/driver/dashboard';
    }
    if (user.role === 'admin') {
      redirectURL = '/admin/dashboard';
    }
    return res.redirect(redirectURL);
  }

  return res.render('index', { user: user });
});

module.exports = router;

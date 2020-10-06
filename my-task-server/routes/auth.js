var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth');


// POST /auth/signup
router.post('/signup', authController.postSignup);

router.get('/login', (req, res) => {
  if (req.session && req.session.user) {
    return res.redirect('/');
  } else {
    return res.render('login');
  }
});



// POST /auth/login
router.post('/login', authController.postLogin);


/* LOGOUT ROUTER */
router.get('/logout', function(req, res, next) {
  req.session.destroy(() => {
    res.redirect('/');
  });
});










module.exports = router;


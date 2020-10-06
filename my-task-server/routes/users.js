const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const isAuthenticated = require('../middlewares/check-auth');


// get /users/profile
router.get('/profile', userController.getUser);
router.post('/profile',isAuthenticated, userController.getUser);


module.exports = router;
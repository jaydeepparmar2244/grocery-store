const express = require('express');
const router = express.Router();
// const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
// const ExpressError = require('../utils/ExpressError');
const passport = require('passport');
const users = require('../controllers/users');
const products = require('../controllers/products')

router.route('/register')
    .get(users.registerForm)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.loginForm)
    .post(passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),users.login);
    
router.get('/logout',users.logout);

router.get('/profile',users.showProfile);

router.get('/',products.index)

module.exports = router;
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const passport = require('passport');


router.get('/',passport.checkAuthentication, homeController.home);


router.use('/user', require('./user'));
router.use('/student', require('./student'));
// router.get('/student-page', passport.checkAuthentication, homeController.studentDetails);
// router.get('/', passport.checkAuthentication, homeController.home);

// router.get('/sign-in', homeController.signIn);
// router.get('/sign-up', homeController.signUp);


module.exports = router;
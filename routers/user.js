const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user_controller');
const homeController = require('../controllers/home_controller');



// router.post('/create-session',passport.authenticate('local',
//                         {failureRedirect : '/sign-in'}), userController.home);
// router.get('/student-page', passport.checkAuthentication, homeController.studentDetails);
// router.get('/', passport.checkAuthentication, homeController.home);

router.get('/sign-in', homeController.signIn);
router.get('/sign-up', homeController.signUp);
router.get('/sign-out', homeController.signOut);

router.get('/student-page',passport.checkAuthentication, homeController.studentDetails);

router.post('/create-session',passport.authenticate('local',
                        {failureRedirect : '/user/sign-in'}), userController.createSession);
router.post('/create-account', userController.CreateUser);
// router.get('/', homeController.home);


module.exports = router;
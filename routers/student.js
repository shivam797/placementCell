const express = require('express');
const passport = require('passport');
const router = express.Router();

const studentController = require('../controllers/student_controller');

router.get('/student-list',passport.checkAuthentication, studentController.studentList);
router.get('/student-detail/:id',passport.checkAuthentication, studentController.studentDetail); 
router.get('/destroy-student/:id', passport.checkAuthentication, studentController.destroyCompany);
router.get('/student-company/:id', passport.checkAuthentication, studentController.companyDetails);
router.get('/csv', studentController.csv);
router.post('/create-student-data',passport.checkAuthentication, studentController.createStudentData);
router.post('/student-company-update', passport.checkAuthentication, studentController.companyUpdate);
router.post('/create-student-score', studentController.createScores);
router.post('/create-company-data', studentController.createNewCompany);
module.exports = router;
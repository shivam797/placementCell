const express = require('express');
const passport = require('passport');
const router = express.Router();

const studentController = require('../controllers/student_controller');

router.get('/student-list', studentController.studentList);
router.get('');

router.post('/create-student-data', studentController.createStudentData);

module.exports = router;
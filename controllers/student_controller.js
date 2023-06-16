const Student = require('../models/student_detail');

module.exports.createStudentData = async function(req, res){
    console.log(req.body);
    try {
        if(!req.isAuthenticated){
            return res.redirect('/');
        }
        let student = await Student.findOne({email : req.body.email});
        if(student){
            alert('this user already exist');
        }
        else{
            let temp = await Student.create(req.body);
            console.log(temp);
        }
        return res.redirect('/student/student-list')
    } catch (error) {
        console.log('error while creating new student data:', error);
        return res.redirect('back');
    }
}


module.exports.studentList = async function(req, res){
    let student = await Student.find({});
    console.log('student', student);
    student.sort((a,b)=> (a.createdAt<b.createdAt)? 1:-1);
    return res.render('student-list',{
        students : student
    });
}
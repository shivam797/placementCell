const Student = require('../models/student_detail');
const Company = require('../models/company');
const Course = require('../models/course_score');
const fs = require('fs');
module.exports.createStudentData = async function (req, res) {
    console.log(req.body);
    try {
        if (!req.isAuthenticated) {
            return res.redirect('/');
        }
        let student = await Student.findOne({ email: req.body.email });
        if (student) {
            alert('this user already exist');
        }
        else {
            let temp = await Student.create(req.body);
            console.log(temp);
        }
        return res.redirect('/student/student-list')
    } catch (error) {
        console.log('error while creating new student data:', error);
        return res.redirect('back');
    }
}


module.exports.studentList = async function (req, res) {
    let student = await Student.find({});
    // console.log('student', student);
    student.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1);
    return res.render('student-list', {
        students: student
    });
}

module.exports.studentDetail = async function (req, res) {
    if (req.isAuthenticated) {
        // console.log(req.params);
        let student = await Student.findById(req.params.id);
        let company = await Company.find({ studentId: req.params.id });
        let course = await Course.findOne({ studentId: req.params.id });
        // console.log(student);
        // console.log('company list', company);
        return res.render('student-detail', {
            stud: student,
            course: course,
            company: company
        });
    }
}

module.exports.createScores = async function (req, res) {
    let score = await Course.create(req.body);
    let student = await Student.findByIdAndUpdate(score.studentId, {courseId : score.id});
    // console.log(student);
    // console.log(score);
    return res.redirect('back');
}

module.exports.companyDetails = async function (req, res) {
    try {
        // console.log('req.param : ', req.params);
        const student = await Student.findById(req.params.id);
        // console.log('fsjhks:',student);
        return res.render('company-form', {
            stud: student
        });
    } catch (error) {
        console.log('error is due to:', error);
    }

}

module.exports.createNewCompany = async function (req, res) {
    try {
        // console.log('new ..', req.body);
        // console.log('company' , req.body);
        let date = req.body.interviewDate.substring(0, 10);
        console.log('date', date);
        let company = await Company.create({
            companyName: req.body.companyName,
            interviewDate: date,
            placementStatus: req.body.placementStatus,
            studentId: req.body.studentId
        });
        let student = await Student.findById(company.studentId);
        student.companyId.push(company.id);
        student.save();
        console.log('company list', company);
        console.log('student detail after push', student);
        let text = `/student/student-detail/${req.body.studentId}`;
        // console.log('text:', text);
        return res.redirect(text);
    } catch (error) {
        console.log("error in company dats", error);
    }
}

module.exports.destroyCompany = async function (req, res) {
    console.log(req.params.id);
    let company = await Company.findByIdAndDelete(req.params.id);
    // console.log('delete :', company);
    return res.redirect('back')
}

module.exports.companyUpdate = async function (req, res) {
    try {
        console.log(req.body);
        let company = await Company.findByIdAndUpdate( req.body.id , {
            placementStatus: req.body.placementStatus
        }, {new : true});

        // company.updateOne({placementStatus : req.body.placementStatus});
        // await company.save();
        // console.log('company after update', company);

        return res.redirect('back');
    } catch (error) {
        console.log('update error', error);
    }

    console.log(req.body);
    let company = await Company.findByIdAndUpdate({ id: req.body.id }, {
        placementStatus: req.body.placementStatus
    });



    // company.updateOne({placementStatus : req.body.placementStatus});
    // await company.save();
    // console.log('company after update', company);

    return res.redirect('back');
}


const { Parser } = require('json2csv');
module.exports.csv = async function (req, res) {

    try {
        const company = await Company.find({}).populate('studentId');
        // .populate('studentId.courseId');
        // console.log('company', company);
        let array = []
        const fields =['studentId.id','studentId.name', 'studentId.college','studentId.batch',
                        'studentId.courseId.dsa',
                        'studentId.courseId.webdesign',
                        'studentId.courseId.react', 'companyName', 'interviewDate',
                    'placementStatus'];
        const json2csvParser = new Parser({ fields, excelStrings: true });
        let csvFormat = '';
        for(comp of company){
            let temp = await comp.populate('studentId.courseId');
            // console.log(temp);
            csvFormat+=json2csvParser.parse(temp);
        }
        
        // //-	Student id, student name, student college, student status, DSA Final Score, 
        // //WebD Final Score, React Final Score, interview date, interview company, 
        // //interview student result
        // for(var stu of student){
        //     let temp = await stu.populate(['companyId','courseId']);
        //     // console.log(temp);
        //     csvFormat+= json2csvParser.parse(temp);
        //     console.log(csvFormat);
        // }
         res.attachment('placement.csv');
        res.status(200).send(csvFormat);               
        

        // console.log('company data',company);
        // const fields = ['companyName', 'interviewDate', 'placementStatus', 'studentId.name'
        //     , 'studentId.batch', 'studentId.email'];
        // const json2csvParser = new Parser({ fields, excelStrings: true });
        // const csvFormat = json2csvParser.parse(company);
        // fs.writeFile('inform.csv', csvFormat, function (err) {
        //     if (err) {
        //         console.log('err in csv download', err)
        //     }
        //     console.log('file saved');
        // })
        // res.attachment('placement.csv');
        // res.status(200).send(csvFormat);
        // return res.redirect('back');
    } catch (error) {
        console.log('error in csv download', error);
    }

}
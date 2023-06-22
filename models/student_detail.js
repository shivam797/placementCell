const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    college : {
        type : String,
        required : true
    },
    batch : {
        type : String,
        required : true
    },
    contact : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    courseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'stud_scores'
    },
    companyId :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'companyInterviews'
    }]
    
}, {
    timestamps : true
});

const student = mongoose.model('student_details', StudentSchema);
module.exports = student;
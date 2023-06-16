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
    }
    
}, {
    timestamps : true
});

const student = mongoose.model('student_detail', StudentSchema);
module.exports = student;
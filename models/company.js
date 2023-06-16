const mongoose = require('mongoose');

const company = new mongoose.Schema({
    companyName : {
        type : String,
        required : true
    },
    interviewDate : {
        type : Date,
        require : true
    },
    placementStatus : {
        type : String,
        required : true,
        enum : ['on Hold','selected', 'pending', 'not selected', 'not attempted']
    },
    studentId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'student_detail'
    }
}, {
    timestamps: true
});

const companys = mongoose.model('companyInterview', company);
module.exports = companys;
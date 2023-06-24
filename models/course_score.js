const mongoose = require('mongoose');
const score_scheme = new mongoose.Schema({
    dsa : {
        type : Number,
        required : true
    },
    webdesign : {
        type : Number,
        required: true
    },
    react : {
        type : Number,
        required : true
    },
    studentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'student_detail'
    }
}, {
    timestamps: true
});

const scores = mongoose.model('stud_scores', score_scheme);
module.exports = scores;
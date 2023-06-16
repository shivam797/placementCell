const User = require('../models/user');

module.exports.home = function(req, res){
    try {
        return res.render('home');
    } catch (error) {
        console.log('home page', error);
        
    }
}

module.exports.signUp = function(req, res){

    return res.render('sign-up');
}
 

module.exports.signIn = function(req, res){
    return res.render('sign-in');
}

module.exports.studentDetails = function(req, res){
    return res.render('student');
}
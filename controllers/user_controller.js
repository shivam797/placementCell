
const User = require('../models/user');
const company = require('../models/company');

module.exports.CreateUser = async function(req, res){
    console.log(req.body);
    try {
        if (req.body.password != req.body.confirmPassword){
            alert('your password is mismatched');
            return res.redirect('back');
        }
    
        
    
        let user = await User.findOne({email : req.body.email});
        console.log('user', user);
        if(!user){
            User.create({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password
            });

        }
        return res.redirect('/')
    } catch (error) {
        console.log('error in userfind', error);        
    }    

}

module.exports.createSession = function(req, res){
    // if(req.isAuthenticated()){
    return res.redirect('/');
    // return res.render('home');
    // }
    // return res.redirect('/sign-in');
}
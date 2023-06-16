const passport = require('passport');
const User = require('../models/user');
const localStrategy = require('passport-local').Strategy;

//authentication using passport
passport.use(new localStrategy({
    usernameField: 'email'
},  async function(email, password, done){
    
    try {
    // find a user and establish the identity
    let user = await User.findOne({email:email}); 
    if(!user || user.password != password){
        console.log('Invalid username / password')
        return done(null, false);
    } 
    return done(null, user);

    } catch (error) {
        console.log('err in passport', error);
                return done(error);
    }
           
}));

//serialing the user to decide which key is to be kept in the cookies.

passport.serializeUser(function(user, done){
     done(null, user.id);
})

//deserializing the user from the key in the cookies.
passport.deserializeUser(async function(id, done){
    try {
        let user = await User.findById(id);
        return done(null, user);
    } catch (error) {
        console.log('error in finding the user', error);
        return done(error);        
    }
});

//check is user is authenticated
passport.checkAuthentication = function(req, res, next){
    //if the user is authenticated then pass on the request to the
    // next function
    if (req.isAuthenticated()){
        return next();
    }

    //if user is not sign in
    return res.redirect('/user/sign-in');
}


passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated())
    {
        //req.user contains the current signed in user from the session cookie
        //and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;

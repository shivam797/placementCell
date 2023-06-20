const express = require('express');


const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');

const json2csv = require('json-2-csv');
const port = 8000;
const app = express();
app.use(cookieParser());
// app.get('/', function(req, res){
//     return res.send('<h1>cool! it is running</h1>');
// })
//************************************************************* *
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.set('views', './views');
//*****************************************************************

app.use(expressLayouts);
app.use(express.static('./assets'));
app.use(express.urlencoded());


app.use(session({
    name : 'auth',
    //to do change the secret before depoyment in production mode
    secret : ' blahsomething',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : 1000*60*100
    },
    store :  MongoStore.create({
        mongoUrl :  'mongodb://0.0.0.0/placement_db',
        autoRemove : 'disabled'       
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use('/', require('./routers/index'));
app.listen(port, function(err){
    if(err){
        console.log("error in running the server", err);
    }
    console.log('yup! My express server is running on port:', port);
});
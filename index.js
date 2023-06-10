const express = require('express');
const port = 8000;
const app = express();

const db = require('./config/mongoose');

app.get('/', function(req, res){
    return res.send('<h1>cool! it is running</h1>');
})

app.listen(port, function(err){
    if(err){
        console.log("error in running the server", err);
    }
    console.log('yup! My express server is running on port:', port);
});
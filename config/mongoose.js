const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://0.0.0.0/placement_db');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error in connecting db'));

db.once('open', function(){
    console.log('successfully connected to database');
});

module.exports = db;
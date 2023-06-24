const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
// mongoose.connect('mongodb://0.0.0.0/placement_db');
try{

    mongoose.connect('mongodb+srv://shivam797:AzKf6UjCSrbqDjO0@cluster0.iyqge0l.mongodb.net/',
    { useNewUrlParser: true, useUnifiedTopology: true }
);} 
catch (e) {
console.log("could not connect");
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error in connecting db'));

db.once('open', function(){
    console.log('successfully connected to database');
});

module.exports = db;
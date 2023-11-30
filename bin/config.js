const mongoose = require('mongoose');
const dotenv = require('dotenv').config()

mongoose.Promise = global.Promise;

// Connect MongoDB 
module.exports = () => {
    mongoose.connect(process.env.MongoDB_Link).then(() => {
        console.log('Database connection is established.');
    }).catch((err) => {
        console.error('Error connecting to Database:', err);
    });
}
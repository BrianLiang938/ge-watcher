const mongoose = require('mongoose');
// number of times to take an average value
// number of values to pull the average from
const { mongoDB } = require('./config.json');

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.collection('points').deleteMany({});
console.log('Deleted values');
process.exit(1);
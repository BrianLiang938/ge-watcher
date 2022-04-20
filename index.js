const express = require('express');
const mongoose = require('mongoose');
const Points = require('./point.js');

// eslint-disable-next-line quotes
const mongoDB = "-";

const app = express();
const port = process.env.PORT || 8080;

console.log(mongoDB);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// sendFile will go here
app.get('/', function(req, res) {
    const test = new Points({ date: 'testDate', price: 111, mean: 555, stdDev: 666 });
    test.buy = true;
    test.save(function(err) {
      if (err) {
        return;
      }
      console.log('New Author: ' + test);
    });
    res.send('Did it!');
});

app.listen(port);
console.log('Server started at http://localhost:' + port);
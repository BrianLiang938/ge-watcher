const express = require('express');
const mongoose = require('mongoose');
const Points = require('./point.js');
const fetch = require('node-fetch');

// number of times to take an average value
const back = 20;
// number of values to pull the average from
const movingavg = 20;

// eslint-disable-next-line quotes
const { mongoDB } = require('./config.json');

const app = express();
const port = 8080;

console.log(mongoDB);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// little image in browser, needed to not run middleware twice and get exceptions
const favicon = require('serve-favicon');
app.use(favicon(__dirname + '/favicon.ico'));


async function dataPull(req, res, next) {
  const id = req.params.id;
  console.log(id);
  const api_url = `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=5m&id=${id}`;
  const request = await fetch(api_url);
  const json = await request.json();
  const data = json.data;
  req.data = data;
  next();
}

app.get('/:id', dataPull, function(req, res) {
  const vals = [];
  const averages = [];
  const devs = [];
  for (let i = 0; i < movingavg; i++) {
    // newest datapoint at the back
    vals.push(req.data.at(-(i + 1)));
  }
  let avgVal = average(vals);
  averages.unshift(avgVal);
  for (let i = 0; i < back; i++) {
    vals.shift();
    vals.push(req.data.at(-(i + 21)));
    avgVal = average(vals);
    averages.push(avgVal);
    const currDev = standardDev(vals, avgVal);
    devs.push(currDev);
  }
  let string = '';
  for (let i = 0; i < back + 1; i++) {
    string = string + 'Average value at time ' + i + ' is ' + averages.at(i);
    string = string + '<br/>';
  }
  //
  const currPoint = makePoint(req.params.id, req.data.at(-1).timestamp, req.data.at(-1).avgHighPrice, averages[0], devs[0]);
  console.log(currPoint);
  db.collection('points').insertOne(currPoint);
  res.send(string);
});

app.listen(port);
console.log('Server started at http://localhost:' + port);

function average(array) {
  let output = 0;
  let count = 0;
  for (let i = 0; i < 20; i++) {
    const high = array.at(i).avgHighPrice;
    if (high != null) {
      count++;
    }
    const tax = Math.floor(high * 0.01);
    output += high - tax;
  }
  return output / count;
}

function standardDev(array, avg) {
  let diff = 0;
  let output = 0;
  let count = 0;
  for (let i = 0; i < 20; i++) {
    const high = array.at(i).avgHighPrice;
    const tax = Math.floor(high * 0.01);
    diff = (high - tax) - avg;
    output += diff * diff;
    if (high != null) {
      count++;
    }
  }
  return Math.sqrt(output / count);
}

function makePoint(id, pDate, pPrice, pMean, pStddev) {
  const output = new Points({ id: id, date: pDate, price:pPrice, mean:pMean, stdDev: pStddev });
  if (pMean - pStddev > pPrice) {
    output.buy = true;
  }
  return output;
}

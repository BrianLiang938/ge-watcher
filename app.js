const fetch = require('node-fetch');
const express = require('express');
const app = express();
const port = 3000;
// number of times to take an average value
const back = 20;
// number of values to pull the average from
const movingavg = 20;

app.use('/:id', async function(req, res, next) {
    const id = req.params.id;
    console.log(id);
    const api_url = `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=5m&id=${id}`;
    const request = await fetch(api_url);
    const json = await request.json();
    const data = json.data;
    req.data = data;
    next();
});
app.get('/:id', function(req, res) {
    const vals = [];
    const averages = [];
    for (let i = 0; i < movingavg; i++) {
        vals.push(req.data.at(-(i + 1)));
    }
    let avgVal = average(vals);
    averages.unshift(avgVal);
    console.log('first ' + averages.at(0));
    for (let i = 0; i < back; i++) {
        vals.shift();
        vals.push(req.data.at(-(i + 21)));
        avgVal = average(vals);
        averages.push(avgVal);
    }
    let string = '';
    for (let i = 0; i < back + 1; i++) {
        string = string + 'Average value at time ' + i + ' is ' + averages.at(i);
        string = string + '<br/>';
    }
    res.send(string);
});

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

async function test() {
    const api_url = `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=5m&id=556`;
    const request = await fetch(api_url);
    const json = await request.json();
    const size = Object.keys(json.data).length;
    console.log(size);
    
    /*
    const price = item.current.price;
    await interaction.reply('/search ' + input + '\nName of the item: ' + name + '\nPrice of the item: ' + price + ' gp');
    */
}
test();
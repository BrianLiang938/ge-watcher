const fetch = require('node-fetch');
const express = require('express');
const app = express();
const port = 3000;

app.use('/:id', async function(req, res, next) {
    const id = req.params.id;
    console.log(id);
    const api_url = `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=5m&id=${id}`;
    const request = await fetch(api_url);
    const json = await request.json();
    const size = Object.keys(json.data).length;
    const data = json.data;
    const vals = [];
    let avg = 0;
    let count = 0;
    for (let i = 0; i < 20; i++) {
        vals.push(data[size - 1 - i]);
        const high = data[size - 1 - i].avgHighPrice;
        if (high != null) {
            count++;
        }
        const tax = Math.floor(high * 0.01);
        avg += high - tax;
        req.average = avg / count;
    }
    next();
});
app.get('/:id', function(req, res) {
    res.send('Average is ' + req.average);
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
app.use(express.static('public'));
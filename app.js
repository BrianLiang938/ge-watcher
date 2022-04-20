const fetch = require('node-fetch');

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
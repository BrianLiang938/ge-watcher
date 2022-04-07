const { Client, Intents } = require('discord.js');
const { token } = require("process.env");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.login(token);
client.on('ready', readyDiscord);


//const api_url = 'https://secure.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=556';

/*async function test() {
     const request = await fetch(api_url);
     const json = await request.json();
     const item = json.item;
     console.log(json);
     const {members, id} = item;
     console.log(id);
     console.log(members);
}

function bot() {
    const client = new Discord.Client();
    client.login('OTYxNDExNzkwNzE2MTc0Mzg4.Yk4mgQ.M1nAgjcBoIKNjWAu0qc3WN_FTyA');
    client.on('ready', readyDiscord);
}
*/

function readyDiscord() {
    console.log("Im in B)");
}
//bot();
//test();
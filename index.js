const fs = require('node:fs');
const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}
client.login(token);
console.log('Running');

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
    catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// const api_url = 'https://secure.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=556';

/* async function test() {
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
// bot();
// test();
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('search')
		.setDescription('Repeats argument')
        .addStringOption(option => option.setName('input').setDescription('Enter a string')),
	async execute(interaction) {
		const input = interaction.options.getString('input');
		const api_url = `https://secure.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=${input}`;
		const request = await fetch(api_url);
		const json = await request.json();
		const item = json.item;
		const { name } = item;
		const price = item.current.price;
		await interaction.reply('/search ' + input + '\nName of the item: ' + name + '\nPrice of the item: ' + price + ' gp');
	},
};
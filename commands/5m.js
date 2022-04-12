const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('5m')
		.setDescription('5m analysis. Usage /5m "id"')
        .addStringOption(option => option.setName('input').setDescription('Enter a string')),
	async execute(interaction) {
		const input = interaction.options.getString('input');
        const api_url = `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=5m&id${input}`;
		const request = await fetch(api_url);
		const json = await request.json();
        console.log(json);
		const item = json.item;
		const price = item.current.price;
		await interaction.reply('/search ' + input + '\nName of the item: ' + name + '\nPrice of the item: ' + price + ' gp');
	},
};
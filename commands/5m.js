const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('5m')
		.setDescription('5m analysis. Usage /5m "id"')
        .addStringOption(option => option.setName('input').setDescription('Enter a string')),
	async execute(interaction) {
		const input = interaction.options.getString('input');
        const api_url = `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=5m&id=${input}`;
		const request = await fetch(api_url);
		const json = await request.json();
		const size = Object.keys(json.data).length;
		const data = json.data;
		const vals = [];
		let avg = 0;
		for (let i = 0; i < 20; i++) {
			vals.push(data[size - 1 - i]);
			const high = data[size - 1 - i].avgHighPrice;
			const tax = Math.floor(high * 0.01);
			avg += high - tax;
			console.log(high);
		}
		avg = avg / 20;
		console.log(avg);
		await interaction.reply('/5m ' + vals.length);
		// const item = json.item;
		// const price = item.current.price;
		// await interaction.reply('/search ' + input + '\nName of the item: ' + name + '\nPrice of the item: ' + price + ' gp');
	},
};
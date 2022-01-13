//Simple ping pong command
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		return interaction.reply('https://media4.giphy.com/media/37q9y7WbvLAy3Wg90h/giphy.gif');
	},
};

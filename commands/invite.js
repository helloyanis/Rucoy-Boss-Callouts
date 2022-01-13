//Sends an invite link for the bot
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageActionRow, MessageButton, MessageEmbed } = require ('discord.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Invite me to your own server'),
	async execute(interaction) {
    const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel("Invite me")
					.setStyle('LINK')
          .setURL('https://discord.com/api/oauth2/authorize?client_id=821276729199951912&permissions=3072&scope=bot%20applications.commands'),
          
      );
		return interaction.reply({content:"Invite me to your own server!", components:[row]});
	},
};
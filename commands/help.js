//Display a help message
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageActionRow, MessageButton, MessageEmbed } = require ('discord.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get help with using the bot!'),
	async execute(interaction) {
    const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel("Join our server")
					.setStyle('LINK')
          .setURL('https://discord.gg/Qf5f3cmaP9'),
        new MessageButton()
					.setLabel("Fix my permissions (if slash commands do not appear)")
					.setStyle('LINK')
          .setURL('https://discord.com/api/oauth2/authorize?client_id=821276729199951912&permissions=3072&scope=bot%20applications.commands&guild_id='+interaction.guild.id+'&disable_guild_select=true'),
      );
		return interaction.reply({content:"Use `/call` to call a boss! But be careful because this will be sent across servers, so dont't do fake calls!\nTo receive calls, do this setup :\n1. Join our server\n2. Go to <#824555184520298556> and click the follow button.", components:[row]});
	},
};
//Skull calculator (how much gold is needed to skull?)
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageActionRow, MessageButton, MessageEmbed } = require ('discord.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('skull')
		.setDescription('Calculates the amound of gold needed to skull!')
    .addIntegerOption(option=>
    option.setName('level')
    .setDescription('Your base level')
    .setRequired(true)
    )
    .addStringOption(option=>
    option.setName('skull-color')
    .setDescription('The color of the skull you want to get')
    .addChoice("Yellow (1 kill)","Yellow")
    .addChoice("Orange (2 kills)","Orange")
    .addChoice('Red (3 kills)',"Red")
    .addChoice('Black (4 kills or more)',"Black")
    )
    ,
	async execute(interaction) {
   level=interaction.options.getInteger('level')
   color=interaction.options.getString('skull-color')
   if(!color) return interaction.reply("🟨 Yellow Skull : **"+(150*level)+" gold**\n🟧 Orange Skull : **"+(600*level)+" gold**\n🟥 Red Skull : **"+(1950*level)+" gold**\n⬛ Black Skull : **"+(6000*level)+" gold**");
   switch(color){
     case "Yellow":
     return interaction.reply("🟨 Yellow Skull : **"+(150*level)+" gold**");
     break;
     case "Orange":
     return interaction.reply("🟧 Orange Skull : **"+(600*level)+" gold**");
     break;
     case "Red":
     return interaction.reply("🟥 Red Skull : **"+(1950*level)+" gold**");
     break;
     case "Black":
     return interaction.reply("⬛ Black Skull : **"+(6000*level)+" gold**");
     break;
     default:
     return interaction.reply("Error! Unknown skull color...")
   }
	},
};
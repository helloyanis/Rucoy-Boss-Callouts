const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const mob=["🐀Rat Lv. 1","🐀Rat Lv. 3","🦅Crow Lv. 6","🐺Wolf Lv. 9","🐍Cobra & 🦂Scorpion Lv. 15","🪱Worm Lv. 14","Goblin Lv.  15","Mummy Lv. 25","Pharaoh Lv. 35","🟥Assassin Lv. 45","🟨Assassin Lv. 50","Assassin Ninja Lv. 55","🧟Zombie Lv. 65"]
const hit=[10,16,28,36,38,40,50,80,110,150,170,190,220]
const effec=[10,16,28,36,38,40,50,80,110,150,170,190,222]
module.exports = {
	data: new SlashCommandBuilder()
		.setName('train')
		.setDescription('Calculates what mob to train effectively on!')
    .addIntegerOption(option=>
      option.setName("level")
    .setDescription("Your base level")
    .setRequired(true)
    )
    .addIntegerOption(option=>
      option.setName("stat")
    .setDescription("The stat you want to train (Melee, Magic or Distance)")
    .setRequired(true)
    ),
    
	async execute(interaction) {
    stat=interaction.options.getInteger('stat')
    level=interaction.options.getInteger('level')
    if(stat<=5 || level<1){
      return interaction.reply('Invalid format!\nLevel must be at least 1\nStat must be at least 6')
    }
    abitrain=stat*2-level*2
    for (let i = 0; hit.length; i++) {
      if(i>mob.length){
        return interaction.reply("✅You can train effectively on "+mob[mob.length-1]+", or maybe above.")
      }
      if(abitrain>=hit[i]&&abitrain<hit[i+1]){
        //12e
        if(i>12){
        text="✅You can train effectively on"+mob[i-1]+"\n❎You can hit "+mob[i]+", but training this monster won't be effective.\n🔜You'll need "+((effec[i+1]-level/2)-stat)+" more stat(s) (reach "+(effec[i+1]-level/2)+") before you can train effectively on "+mob[i]
        }else{
          text="✅You can train effectively on "+mob[i]+"\n"
          if(abitrain>=hit[i]&&abitrain<effec[i]){
            text=text+"🔜You'll need "+((hit[i+1]-level/2)-stat)+" more stat(s) (reach "+(hit[i+1]-level/2)+") before you can deal tammage on "+mob[i+1]+"\n🔜You'll need "+((effec[i+1]-level/2)-stat)+" more stat(s) (reach "+(effec[i+1]-level/2)+") before you can train effectively on "+mob[i+1]
          }else{
            text=text+"🔜You'll need "+((effec[i+1]-level/2)-stat)+" more stat(s) (reach "+(effec[i+1]-level/2)+") before you can train effectively on "+mob[i+1]
          }
        }
        return interaction.reply(text)
      }
    } 
	},
  
};

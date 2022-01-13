//The main command of this bot, use it to tell other people that a boss spawned! It also sends to other servers.
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
let crole = require("../crole.json")
let hrole = require("../hrole.json")
let messchannel = require('../messchannel.json')
let banned = require('../banned.json')
let certified = require('../certified.json')
let testers = require('../testers.json')
function checkInput(input, words) {
 return words.some(word => input.toLowerCase().includes(word.toLowerCase()));
}
const forbidden=[".com",".fr",".gg"," dot ", "d0t","discord",".io","http","https","www","://",".it",".ru",".es","@here","@everyone","<@!","<@&","yt","youtube","follo","scribe","chann","nnel","twi","tch","witch","guild","ild","recr","cruit","sell","acc","scam","sta","tats","giv","nitro","join","@","0","5","6","7","8","9","*","%","name"]
module.exports = {
  data: new SlashCommandBuilder()
    .setName('call')
    .setDescription('Call a boss!')
    .addSubcommand(subcommand =>
      subcommand
        .setName('normal-bosses')
        .setDescription('Bosses you can find in fixed areas. Vampire king, Drow Queen, General Krinok, Zarron Bravehorn...')
        .addStringOption(option =>
          option.setName('boss')
            .setDescription('The boss you want to call! If you do not find it, check the special bosses.')
            .setRequired(true)
            .addChoice("Goblin Lord", "Goblin Lord")
            .addChoice("Kamon The Cursed (Pharaoh boss)", "Kamon The Cursed")
            .addChoice("Vampire King (In the Vampire's lair)", 'Vampire King')
            .addChoice("Drow Queen (In the Drows Throne)", "Drow Queen")
            .addChoice('General Krinok (In the Lizard Dungeon)', 'General Krinok')

            .addChoice('Zarron Bravehorn', 'Zarron Bravehorn')
            .addChoice('Goliath (at Gargoyles)', 'Goliath')
            .addChoice('Cerberus (Disturbance in the Volcano)', 'Cerberus'))
        .addStringOption(option =>
          option.setName("server")
            .setDescription("The server the boss spawned in!")
            .setRequired(true)
            .addChoice("North America 1", "North America 1")
            .addChoice("North America 2", "North America 2")
            .addChoice("North America 3", "North America 3")
            .addChoice("North America 4", "North America 4")
            .addChoice("North America 5", "North America 5")
            .addChoice("North America 6", "North America 6")

            .addChoice("South America 1", "South America 1")
            .addChoice("South America 2", "South America 2")
            .addChoice("South America 3", "South America 3")
            .addChoice("South America 4", "South America 4")
            .addChoice("South America 5", "South America 5")
            .addChoice("South America 6", "South America 6")
            .addChoice("South America 7", "South America 7")

            .addChoice("Europe 1", "Europe 1")
            .addChoice("Europe 2", "Europe 2")
            .addChoice("Europe 3", "Europe 3")
            .addChoice("Europe 4", "Europe 4")
            .addChoice("Europe 5", "Europe 5")
            .addChoice("Europe 6", "Europe 6")

            .addChoice("Asia 1", "Asia 1")
            .addChoice("Asia 2", "Asia 2")
            .addChoice("Asia 3", "Asia 3")
            .addChoice("Asia 4", "Asia 4")
        ),

    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("special-bosses")
        .setDescription("Bosses that can spawn anywhere! Includes Slime Lord, christmas and halloween bosses.")
        .addStringOption(option =>
          option
            .setName("boss")
            .setDescription("The boss you want to call! If you do not find it, check the normal bosses.")
            .setRequired(true)
            .addChoice('Slime Lord', 'Slime Lord')
            .addChoice('Evil Snowman (Christmas boss)', 'Evil Snowman')
            .addChoice("Evil Santa (Christmas boss)", 'Evil Santa')
            .addChoice('Haunted Willow (Halloween Boss)', 'Haunted Willow')
            .addChoice("La Calaca (Halloween Boss)", "La Calaca")
            .addChoice("Wicked Pumpkin (Halloween Boss)","Wicked Pumpkin")
        )
        .addStringOption(option =>
          option.setName("server")
            .setDescription("The server the boss spawned in!")
            .setRequired(true)
            .addChoice("North America 1", "North America 1")
            .addChoice("North America 2", "North America 2")
            .addChoice("North America 3", "North America 3")
            .addChoice("North America 4", "North America 4")
            .addChoice("North America 5", "North America 5")
            .addChoice("North America 6", "North America 6")

            .addChoice("South America 1", "South America 1")
            .addChoice("South America 2", "South America 2")
            .addChoice("South America 3", "South America 3")
            .addChoice("South America 4", "South America 4")
            .addChoice("South America 5", "South America 5")
            .addChoice("South America 6", "South America 6")
            .addChoice("South America 7", "South America 7")

            .addChoice("Europe 1", "Europe 1")
            .addChoice("Europe 2", "Europe 2")
            .addChoice("Europe 3", "Europe 3")
            .addChoice("Europe 4", "Europe 4")
            .addChoice("Europe 5", "Europe 5")
            .addChoice("Europe 6", "Europe 6")

            .addChoice("Asia 1", "Asia 1")
            .addChoice("Asia 2", "Asia 2")
            .addChoice("Asia 3", "Asia 3")
            .addChoice("Asia 4", "Asia 4")
        )
        .addStringOption(option =>
          option.setName('location')
            .setDescription('The location of the boss on the map! The bosses do not have a fixed location so this is required!')
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    boss = interaction.options.getString('boss')
    if (boss == "Goblin Lord" || boss == "Kamon The Cursed") return interaction.reply("That boss goes down very quickly. It's not worth calling it, because people will likely find it before anyone who was pinged will be able to come and kill it.")
    switch (boss) {
      case "Vampire King":
        boss = "<a:Vampire_King_A:650756858491174912> Vampire King"
        break;
      case "Drow Queen":
        boss = "<:drowqhd:850380304664494110> Drow queen";
        break;
      case "General Krinok":
        boss = "<a:Krinok_A:650756546854256700> General Krinok (Lizard boss)";
        break;
      case "Zarron Bravehorn":
        boss = "<:zarronhd:850380397225443379> Zarron Bravehorn (Minotaur boss)";
        break;
      case "Goliath":
        boss = "<:goliath:821647375755640872> Goliath";
        break;
      case "Cerberus":
        boss = "<:cerbhd:850380367173255188> Cerberus";
        break;
      case "Slime Lord":
        boss = "<a:slimedance:821328381827088396> Slime Lord";
        break;
      case "Evil Santa":
        boss = "<a:Santa_Claus_A:650756455594721288> Evil Santa";
        break;
      case "Evil Snowman":
        boss = "⛄ Evil Snowman";
        break;
      case "Haunted Willow":
        boss = "<a:Haunted_Willow_A:650756580559552513> Haunted Willow";
        break;
      case "La Calaca":
        boss = "💀 La Calaca";
        break;
      case "Wicked Pumpkin":
        boss = "🎃 Wicked Pumpkin";
        break;
      default:
        return interaction.reply("Error, unknown boss...")

    }
    server = interaction.options.getString('server')
    location = interaction.options.getString('location')
    if(location!=null && checkInput(location,forbidden)){
      return await interaction.reply({content:"Invalid location!",ephemeral:true})
    }
    if (banned[interaction.user.id]) {
      return await interaction.reply({content:"You were banned from the bot! You can't call bosses anymore! Here is the reason :\n`" + banned[interaction.user.id] + "`",ephemeral:true})
    }
    try{
    if (!interaction.member.roles.cache.has(crole[interaction.guild.id]) && crole[interaction.guild.id]) {
      return await interaction.reply({content:"You don't seem to have enough permissions to use this command, you need to have the boss caller role for that!",ephemeral:true})
    }
    }catch{
      return await interaction.reply({content:"Sorry, I'm not working in DMs! Try in a server...",ephemeral:true})
    }
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel("Cancel")
          .setStyle('SECONDARY')
          .setCustomId('call_cancel'),
        new MessageButton()
          .setLabel("Confirm")
          .setStyle('DANGER')
          .setCustomId('call_confirm'),
      );
    console.log("1")
    await interaction.reply({ content: "You are about to call __**" + boss + " in " + server + "**__.\n❗ __**THIS WILL PING PEOPLE! DON'T DO THAT IF YOU JUST WANT TO TEST THE BOT!**__\nTo test the bot, use the command `/help` and follow the steps.\nDo you really want to call this boss?", components: [row], ephemeral: true });
console.log("2")
    const collector = interaction.channel.createMessageComponentCollector({
      max: 1,
      time: 30000
    })
    console.log("3")
    collector.on('collect', async (ButtonInteraction) => {
      console.log(4)
      await ButtonInteraction.deferUpdate();
      console.log(5)
      if (typeof ButtonInteraction == 'undefined') return interaction.editReply({ content: "You took too long to chose...\nCancelled.", components: [] });
      switch (ButtonInteraction.customId) {
        case "call_cancel":
          return ButtonInteraction.editReply({ content: "Cancelled.", components: [] });
          break;
        case "call_confirm":
        
        content = ("__" + boss + " in " + server +"__\nCalled by <@!" + interaction.user.id + "> `" + interaction.user.tag + "`")
        if (certified[interaction.user.id]) {
          content = content + "\n**:military_medal: Certified boss caller!**"
        }
        if (testers[interaction.user.id]) {
          content = content + "\n**🛠️ Bot tester!**"
        }
        if (location != null) {
          content = content + "\n**Location : `" + location + "`**"
        }
const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('fake_call')
					.setLabel('Fake call?')
					.setStyle('DANGER'),
			);
          interaction.client.guilds.cache.get("824554051331948554").channels.cache.get("824555184520298556").send({content:"<@&846746887104233482> **Boss called!**\n" +content, components:[row]}).then( message6 => {
            try{
            message6.crosspost()
            }catch{
              message6.edit("<@&846746887104233482> **Boss called!**\n" +content+"\n**Could not publish message, due to Discord rate limits (Max is 10 published messages per hour)**")
            }
          })
          ButtonInteraction.client.guilds.cache.get("824554051331948554").channels.cache.get("855720206042791936").send(content + "\nGuild : " + ButtonInteraction.guild.id)
          await ButtonInteraction.editReply({content:"Here you go!\nIf you do not see the call appearing in your server :\n1. Join our server ||https://discord.gg/Qf5f3cmaP9||\n2. Go to <#824555184520298556>\n3. Click the follow button\nIf you have any problems, send a message in the server!",components:[]})
          break;
        default:
      }
    })
  interaction.client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
	console.log(interaction);
  switch(interaction.customId){
    case "fake_call":
      //interaction.client.guilds.cache.get("824554051331948554").channels.cache.get("858226556307898408").send("<@!"+interaction.user.id+"> reported call https://discord.com/channels/824554051331948554/824555184520298556/"+interaction.message.id+" to be fake!")
      try{
      interaction.reply("<@!"+interaction.user.id+"> reported this call as fake!")
      }catch (e){
        console.log(e)
      }
  }
  });
  },
};

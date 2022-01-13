//This uses the default file structure from discord.js
const express = require('express');
const requests = require('requests')
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('BC host page (The bot is up and running!)✅'));
const fs = require('fs');
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
const Discord = require('discord.js');
const { Client, Collection, Intents, MessageActionRow, MessageButton, Permissions } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { ownerid, clientId, guildId, prefix } = require('./config.json')
let crole = require("./crole.json")
let hrole = require("./hrole.json")
let messchannel = require('./messchannel.json')
let banned = require('./banned.json')
let certified = require('./certified.json')
const testers = require('./testers.json')
const client = new Discord.Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_INVITES,Intents.FLAGS.GUILD_MESSAGE_REACTIONS], ws: { properties: { $browser: "Discord iOS" }} });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}
//
//LOCAL DEPLOY (for testing commands)
//
function localdeploy(){
const commands = [];

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env['token']);

(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(clientId,guildId),
			{ body: commands },
		);

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	}
})();
}
//localdeploy()
//
//END
//

//
//GLOBAL DEPLOY (to get commands on every server once they were tested)
//
function globaldeploy()
{
  const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v9');
  const { clientId, guildId } = require('./config.json');

  const commands = [];
  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
  }
  console.log(commands)


  const rest = new REST({ version: '9' }).setToken(process.env['token']);
  
  rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
}
globaldeploy()
//
//END
//
client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  //
//DELETE GLOBAL
//
//client.application.commands.set([]).then(console.log).catch(console.error);
//
//DELETE LOCAL
//
//client.guilds.cache.get(guildId).commands.set([]).then(console.log).catch(console.error);
//
//END
//
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
    try{
		return interaction.reply({ content: 'There was an error while executing this command!\nThis is likely not your fault, i may just be updating something... Check back later, and if you keep getting this message, tell it in our server! https://discord.gg/CW3nCakzVh', ephemeral: true });
    }catch{
      console.error("Could not send error message")//If interaction timed out
    }
	}
});


//Below is old system without slash commands, is outdated but i'm still keeping it around, we never know ;)
/*

calling = []
client.on('messageCreate', async message => {
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const ocommand = args.shift().toLowerCase();
  function getUserFromMention(mention) {
    if (!mention) return;
    if (mention.startsWith('<@') && mention.endsWith('>')) {
      mention = mention.slice(2, -1);

      if (mention.startsWith('!')) {
        mention = mention.slice(1);
      }

      return client.users.cache.get(mention);
    }
  }
  if (message.author.bot) return
  if (ocommand == "keys") {
    return console.log(Object.keys(messchannel)[0])
  }
  if (ocommand == "ping") {
    return message.channel.send("https://media4.giphy.com/media/37q9y7WbvLAy3Wg90h/giphy.gif")
  }
  if (ocommand=="reset"){
    calling=[]
    message.react("✅")
  }


  if (ocommand === 's' || ocommand == 'say' && (message.author.id === ownerid)) {
    if (!args[0].startsWith("<#")) {
      channelid = message.channel.id
    } else {
      channelid = args[0]
      cont = args.shift()
    }
    console.log(message.author.id + " - " + args.join(" "))
    message.delete()


    if (channelid.startsWith("<#")) {
      channelid = channelid.slice(2, -1);
    }
    // 800716450942812180
    return client.channels.cache.get(channelid).send(args.join(" "))
  }
  
  if (ocommand == "inv" && (message.author.id == "336458121180610560")) {
    invites = []
    
    client.guilds.cache.forEach(guild => {
      if(!args[0] || args[0]==guild.id){
        guild.channels.cache.filter(x => x.type === "text").random().createInvite({
        maxAge: 50, // maximum time for the invite, in milliseconds
        maxUses: 1, // maximum times it can be used
        unique: true
      })
        .then(inv => 
        message.author.send(`${guild.name} | ${guild.id} | ${inv.url}\n`));
      }
    })
  }
  
  if (ocommand == "help") return message.channel.send("Hi! To call a boss you want to type `$call`. If you want to invite me, type `$invite`.")
  if (ocommand == "invite") return message.channel.send("Thank you for inviting me!\nhttps://discord.com/api/oauth2/authorize?client_id=821276729199951912&permissions=8&scope=bot")
  if (ocommand == "call" || ocommand == "boss") {
    return message.channel.send("Slash commands are out! Try `/call` (If the bot does not appear in the slash command screen, use the link to fix my permissions)\nhttps://discord.com/api/oauth2/authorize?client_id=821276729199951912&permissions=3072&scope=bot%20applications.commands&guild_id="+message.guild.id+"&disable_guild_select=true")
    if (!message.guild.me.permissions.has("ADMINISTRATOR")) return message.channel.send("I do not have enough permissions. Please ask an admin to click on this link to give me the permissions!\nhttps://discord.com/oauth2/authorize?client_id=821276729199951912&permissions=8&scope=bot&guild_id=" + message.guild.id + "&disable_guild_select=true")
    if (banned[message.author.id] && message.author.id != "336458121180610560") {
      return message.reply("you were banned from the bot! You can't call bosses anymore! Here is the reason :\n`" + banned[message.author.id] + "`")
    }
    if (!message.member.roles.cache.has(crole[message.guild.id]) && crole[message.guild.id] && message.author.id != "336458121180610560") {
      return message.channel.send("You don't seem to have enough permissions to use this command, you need to have the boss caller role for that!")
    }
    if (calling.includes(message.author.id)) {
      return message.reply("you are already calling a boss! You can only call one at a time!")
    }
    if (message.author.createdAt < 1.814e+9) {
      console.log(message.author.tag + " - " + message.author.id)
      return message.reply("your account is pretty new! You need to wait 3 weeks after creating your account before doing that!")
    }
    if (calling.length != 0) {
      return message.channel.send("<@!" + calling[0] + "> is already calling a boss! Please wait for them to finish before doing it yourself!\nIf you see this for too long use `$reset`")
    }
    calling.push(message.author.id)
    boss = ""
    server = ""
    sn = ""
    location = ""
    message.reply("**All right, what boss do you want to call?**\n```\nNormal bosses\n```\n<a:Goblin_Lord_A:650756490835132432> Goblin Lord\n<a:Kamon_A:650756519494811679> Kamon the Cursed\n<a:Vampire_King_A:650756858491174912> Vampire king\n<:drowqhd:850380304664494110> Drow queen\n<a:Krinok_A:650756546854256700> General Krinok (Lizard boss)\n<:zarronhd:850380397225443379> Zarron Bravehorn (Minotaur boss)\n<:goliath:821647375755640872> Goliath\n<:cerbhd:850380367173255188> Cerberus\n<a:slimedance:821328381827088396> Slime Lord\n```\nEvent bosses\n```\n<a:Santa_Claus_A:650756455594721288> Evil Santa\n⛄ Evil Snowman\n<a:Haunted_Willow_A:650756580559552513> Haunted willow\n💀 La Calaca\n```\n \n```\n❌Cancel")
      .then(message2 => {
        // Reacts so the user only have to click the emojis
        message2.react('650756490835132432')
          .then(r => { message2.react('650756519494811679') })
          .then(r => { message2.react('650756858491174912') })
          .then(r => { message2.react('850380304664494110') })
          .then(r => { message2.react('650756546854256700') })
          .then(r => { message2.react('850380397225443379') })
          .then(r => { message2.react('821647375755640872') })
          .then(r => { message2.react('850380367173255188') })
          .then(r => { message2.react('821328381827088396') })
          .then(r => { message2.react('650756455594721288') })
          .then(r => { message2.react('⛄') })
          .then(r => { message2.react('650756580559552513') })
          .then(r => { message2.react('💀') })
          .then(r => { message2.react('❌') })
        // First argument is a filter function
        message2.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.id == '650756490835132432' ||
          reaction.emoji.id == '650756519494811679' || reaction.emoji.id == '650756858491174912' || reaction.emoji.id == '850380304664494110' || reaction.emoji.name == '❌' || reaction.emoji.id == '650756546854256700' || reaction.emoji.id == '850380397225443379' || reaction.emoji.id == '821647375755640872' || reaction.emoji.id == '850380367173255188' || reaction.emoji.id == '821328381827088396' || reaction.emoji.id == '650756455594721288' || reaction.emoji.name == '⛄' || reaction.emoji.id == '650756580559552513' || reaction.emoji.name == '💀'),
          { max: 1, time: 60000 }).then(collected => {
            if (collected.first().emoji.name == '❌') {
              message2.delete()
              calling.splice(calling.indexOf(message.author.id), 1)
              return message.reply('cancelled...');
            } else if (collected.first().emoji.id == '650756490835132432' || collected.first().emoji.id == '650756519494811679') {
              message2.delete()
              calling.splice(calling.indexOf(message.author.id), 1)
              return message.reply("That boss goes down very quickly. It's not worth calling it, because people will likely find it before anyone who was pinged will be able to come and kill it.\nOperation cancelled.");

            }
            else { //Insert boss specific stuff here
              if (collected.first().emoji.id == "650756858491174912") {
                boss = "<a:Vampire_King_A:650756858491174912> Vampire King"
              }
              if (collected.first().emoji.id == "850380304664494110") {
                boss = "<:drowqhd:850380304664494110> Drow Queen"
              }
              if (collected.first().emoji.id == "650756546854256700") {
                boss = "<a:Krinok_A:650756546854256700> General Krinok (Lizard boss)"
              }
              if (collected.first().emoji.id == "850380397225443379") {
                boss = "<:zarronhd:850380397225443379> Zarron Bravehorn (minotaur boss)"
              }
              if (collected.first().emoji.id == "821647375755640872") {
                boss = "<:goliath:821647375755640872> Goliath"
              }
              if (collected.first().emoji.id == "850380367173255188") {
                boss = "<:cerbhd:850380367173255188> Cerberus"
              }
              if (collected.first().emoji.id == "821328381827088396") {
                if (args.length == 0) {
                  message2.delete()
                  calling.splice(calling.indexOf(message.author.id), 1)
                  message2.delete()
                  return message.channel.send("This boss is not in a fixed location. Please precise the location of the boss in your command.\nFor example, if the boss is in Lizard 2, you should do the command `$call Lizard 2`!")
                } else {
                  boss = "<a:slimedance:821328381827088396> Slime Lord"
                  location = args.join(" ")
                }
              }
              if (collected.first().emoji.id == "650756455594721288") {
                if (args.length == 0) {
                  message2.delete()
                  calling.splice(calling.indexOf(message.author.id), 1)
                  return message.channel.send("This boss is not in a fixed location. Please precise the location of the boss in your command.\nFor example, if the boss is in Lizard 2, you should do the command `$call Lizard 2`!")
                } else {
                  boss = "<a:Santa_Claus_A:650756455594721288> Evil Santa"
                  location = args.join(" ")
                }
              }
              if (collected.first().emoji.name == "⛄") {
                if (args.length == 0) {
                  message2.delete()
                  calling.splice(calling.indexOf(message.author.id), 1)
                  return message.channel.send("This boss is not in a fixed location. Please precise the location of the boss in your command.\nFor example, if the boss is in Lizard 2, you should do the command `$call Lizard 2`!")
                } else {
                  boss = "⛄ Evil Snowman"
                  location = args.join(" ")
                }
              }
              if (collected.first().emoji.id == "650756580559552513") {
                if (args.length == 0) {
                  message2.delete()
                  calling.splice(calling.indexOf(message.author.id), 1)
                  return message.channel.send("This boss is not in a fixed location. Please precise the location of the boss in your command.\nFor example, if the boss is in Lizard 2, you should do the command `$call Lizard 2`!")
                } else {
                  boss = "<a:Haunted_Willow_A:650756580559552513> Haunted willow"
                  location = args.join(" ")
                }
              }
              if (collected.first().emoji.name == "💀") {
                if (args.length == 0) {
                  message2.delete()
                  calling.splice(calling.indexOf(message.author.id), 1)
                  return message.channel.send("This boss is not in a fixed location. Please precise the location of the boss in your command.\nFor example, if the boss is in Lizard 2, you should do the command `$call Lizard 2`!")
                } else {
                  boss = "💀 La Calaca"
                  location = args.join(" ")
                }
              }
            }
            message2.delete()
            message.reply("good! Now tell me in what server the boss is in!\n1️⃣ North America\n2️⃣ South America\n3️⃣ Europe\n4️⃣ Asia\nThe reactions might take a few seconds to show up due to bots having slow API reaction times").then(message3 => {
              message3.react("1️⃣")
                .then(() => { message3.react("2️⃣") })
                .then(() => { message3.react("3️⃣") })
                .then(() => { message3.react("4️⃣") })
                .then(() => { message3.react("❌") })
              message3.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '1️⃣' || reaction.emoji.name == '2️⃣' || reaction.emoji.name == '3️⃣' || reaction.emoji.name == '4️⃣' || reaction.emoji.name == '❌'),
                { max: 1, time: 60000 }).then(collected => {
                  if (collected.first().emoji.name == '❌') {
                    message3.delete()
                    calling.splice(calling.indexOf(message.author.id), 1)
                    return message.reply('cancelled...');
                  }
                  if (collected.first().emoji.name == '1️⃣') {
                    server = "North America"
                  }
                  if (collected.first().emoji.name == '2️⃣') {
                    server = "South America"
                  }
                  if (collected.first().emoji.name == '3️⃣') {
                    server = "Europe"
                  }
                  if (collected.first().emoji.name == '4️⃣') {
                    server = "Asia"
                  }
                  message3.delete()
                  message.reply('Final step! Tell me the number of this server (For example, if the boss is in ' + server + " 3, then the number you want to pick is 3!").then(message4 => {
                    if (server == "Asia") {
                      message4.react("1️⃣")
                        .then(() => { message4.react("2️⃣") })
                        .then(() => { message4.react("3️⃣") })
                        .then(() => { message4.react("❌") })
                    }
                    else if (server == "Europe" || server == "North America") {
                      message4.react("1️⃣")
                        .then(() => { message4.react("2️⃣") })
                        .then(() => { message4.react("3️⃣") })
                        .then(() => { message4.react("4️⃣") })
                        .then(() => { message4.react("5️⃣") })
                        .then(() => { message4.react("❌") })
                    }
                    else {
                      message4.react("1️⃣")
                        .then(() => { message4.react("2️⃣") })
                        .then(() => { message4.react("3️⃣") })
                        .then(() => { message4.react("4️⃣") })
                        .then(() => { message4.react("5️⃣") })
                        .then(() => { message4.react("6️⃣") })
                        .then(() => { message4.react("❌") })

                    }

                    message4.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '1️⃣' || reaction.emoji.name == '2️⃣' || reaction.emoji.name == '3️⃣' || reaction.emoji.name == '4️⃣' || reaction.emoji.name == '5️⃣' || reaction.emoji.name == '6️⃣' || reaction.emoji.name == '❌'),
                      { max: 1, time: 60000 }).then(collected => {
                        if (collected.first().emoji.name == '❌') {
                          message4.delete()
                          calling.splice(calling.indexOf(message.author.id), 1)
                          return message.reply('cancelled...');
                        }
                        if (collected.first().emoji.name == '1️⃣') {
                          sn = "1"
                        }
                        if (collected.first().emoji.name == '2️⃣') {
                          sn = "2"
                        }
                        if (collected.first().emoji.name == '3️⃣') {
                          sn = "3"
                        }
                        if (collected.first().emoji.name == '4️⃣') {
                          if (server == "Asia") {
                            calling.splice(calling.indexOf(message.author.id), 1)
                            return message.reply("There is not that many " + server + " servers!\nOperation cancelled.")
                          }
                          sn = "4"
                        }
                        if (collected.first().emoji.name == '5️⃣') {
                          if (server == "Asia") {
                            calling.splice(calling.indexOf(message.author.id), 1)
                            return message.reply("There is not that many " + server + " servers!\nOperation cancelled.")
                          }
                          sn = "5"
                        }
                        if (collected.first().emoji.name == '6️⃣') {
                          if (server != "South America") {
                            calling.splice(calling.indexOf(message.author.id), 1)
                            return message.reply("There is not that many " + server + " servers!\nOperation cancelled.")
                          }
                          sn = "6"
                        }
                        message4.delete()
                        message.delete()
                        if (hrole[message.guild.id]) {
                          ping = "<@&" + hrole[message.guild.id] + ">"
                        } else {
                          ping = "Boss hunters"
                        }
                        if (messchannel[message.guild.id]) {
                          chid = messchannel[message.guild.id]
                        } else {
                          chid = message.channel.id
                        }
                        content = ("__" + boss + " in " + server + " " + sn + "__\nCalled by <@!" + message.author.id + "> `" + message.author.tag + "`")
                        if (certified[message.author.id]) {
                          content = content + "\n**:military_medal: Certified boss caller!**"
                        }
                        if (location != "") {
                          content = content + "\n**Location : `" + location + "`**"
                        }
                        client.channels.cache.get(chid).send(ping + ", **Boss called!**\n" + content + "\nReact with ☠ once it died to delete the call!\nThe boss will be considered dead in 5 minutes.").then(message5 => {
                          calling.splice(calling.indexOf(message.author.id), 1)
                          message5.react("☠")
                          client.guilds.cache.get("824554051331948554").channels.cache.get("824555184520298556").send("<@&846746887104233482> **Boss called!**\n" + content).then(message6 => {
                            message6.crosspost()
                          })
                          client.guilds.cache.get("824554051331948554").channels.cache.get("855720206042791936").send(content + "\nGuild : " + message5.guild.id+"\nUser : ").then(message6 => {
                            message6.crosspost()
                          })
                          if (message5.channel.type === 'news') {
                            message5.crosspost()
                          }
                          message5.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '☠'),
                            { max: 1, time: 300000 }).then(collected => {
                              message5.edit("**Boss dead!**\n" + content)
                            }).catch(() => {
                              message5.edit("**Boss dead!**\n||" + content + "||")
                            })

                        })
                      })


                  })

                }).catch(() => {
                  message3.delete()
                  message.delete()
                  calling.splice(calling.indexOf(message.author.id), 1)
                  return message.reply('No reaction after 1 minute, operation canceled');
                })
            })
          }).catch(() => {
            message.delete()
            message2.delete()
            calling.splice(calling.indexOf(message.author.id), 1)
            return message.reply('No reaction after 1 minute, operation canceled');
          });
      })
  }

});

*/
client.login(process.env['token']);

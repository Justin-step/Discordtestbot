const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

     //kick naam reden

     if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Helaas kunt u dit niet");

     if (!message.guild.me.permissions.has("KICK_MEMBERS")) return message.reply("Geen perms");

     if (!args[0]) return message.reply("Gelieve een gebruiker op te geven");

     if (!args[1]) return message.reply("Gelieve een reden op re geven");

     var kickUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id);

     if (!kickUser) return message.reply("Sorry u kunt dit niet");

     if (kickUser.permissions.has("MANAGE_MESSAGES")) return message.reply('Sorry kan persoon niet kicken');

     var reason = args.slice(1).join(" ");

     var embedPrompt = new discord.MessageEmbed()
     .setColor("GREEN")
     .setTitle("Gelieve te reageren binnen 30 seconden")
     .setDescription(`Wil je ${kickUser} kicken?`);

     var embed = new discord.MessageEmbed()
     .setColor("RED")
     .setDescription(`**Gekickt:** ${kickUser} (${kickUser.id})
          **Gekickt door:** ${message.author} 
          **Reden:** ${reason}`)
          .setFooter(message.member.displayName)
          .setTimestamp();
          
          
        message.channel.send({ embeds: [embedPrompt] }).then(async msg => {
 
            let authorID = message.author.id;
            let time = 30;
            let reactions = ["✅", "❌"];
         
            // We gaan eerst de tijd * 1000 doen zodat we seconden uitkomen.
            time *= 1000;
         
            // We gaan iedere reactie meegegeven onder de reactie en deze daar plaatsen.
            for (const reaction of reactions) {
                await msg.react(reaction);
            }
         
            // Als de emoji de juiste emoji is die men heeft opgegeven en als ook de auteur die dit heeft aangemaakt er op klikt
            // dan kunnen we een bericht terug sturen.
            const filter = (reaction, user) => {
                return reactions.includes(reaction.emoji.name) && user.id === authorID;
            };
         
            // We kijken als de reactie juist is, dus met die filter en ook het aantal keren en binnen de tijd.
            // Dan kunnen we bericht terug sturen met dat icoontje dat is aangeduid.
            msg.awaitReactions({ filter, max: 1, time: time }).then(collected => {
                var emojiDetails = collected.first();

                if (emojiDetails.emoji.name === "✅") {

                    msg.delete();

                    kickUser.kick(reason).catch(err => {
                        if (err) return message.channel.send("Er is iets mis gegaan")
                    })

                    message.channel.send({embeds: [embed] });
               
                } else if (emojiDetails.emoji.name === "❌") {

                    msg.delete();

                    message.channel.send("Kick geanulleerd").then(msg => {
                        message.delete()
                        setTimeout(() => msg.delete(), 5000)
                    })

                }
         
                
            });
        });
}

module.exports.help = {
    name: "kick",
    category: "general",
    description: "De bot kickt u"
}
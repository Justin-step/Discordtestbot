const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
    .setTitle("OnzDorp")
    .setDescription("Wie zijn een leuke Roleplay server u kunt hier veel doen tip: kijk in-game")
    .setColor("#ff0000")
    .addFields(
        {name:"Bot naam", value:client.user.username},
        {name:"Je bent de server gejoined op", value: message.member.joinedAt.toString() },
        {name:"Totaal members", value: message.guild.memberCount.toString() },
    )
    .addField("Bot naam", client.user.username)

    return message.channel.send({ embeds: [botEmbed] });

}

module.exports.help = {
    name: "serverinfo",
    category: "info",
    description: "Geeft info wanneer u ben gejoined"
}
const discord = require('discord.js');

module.exports.run = async (client, message, args) => {

   // !review aantal sterren sterren sterren

   const ammountStars = args[0];

   if (!ammountStars || ammountStars < 1 || ammountStars > 5) return message.reply("Geef een aantal sterren op tussen 1 tot en met 5");

   const messageReview = args.splice(1,args.length).join("") || '**Geen bericht meegegeven**';

   const reviewChannel = message.member.guild.channels.cache.get("945800904320364574");

   if (!reviewChannel) return message.reply("Kanaal niet gevonden");

   var stars = "";

   for (var i = 0; i < ammountStars; i++) {

    stars += ":star: ";

   }

   message.delete();

   const review = new discord.MessageEmbed()
   .setTitle(`${message.author.username} heeft een review geschreven! 🎉`)
   .setColor("#00ff00")
   .setThumbnail("https://cdn.discordapp.com/attachments/689802923156439060/943981948806791178/IMG_5048.png")
   .addField("Sterren:", `${stars}`)
   .addField("Review:", `${messageReview}`);

   message.channel.send("U heeft succesvol een review geschreven")

   return reviewChannel.send({embeds: [review] });


 
}

module.exports.help = {
    name: "review",
    category: "general",
    description: "Laat een leuke review achter"
}
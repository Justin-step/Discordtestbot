const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const row = new discord.MessageActionRow().addComponents(

        new discord.MessageButton()
            .setLabel("ANWB")
            .setStyle("LINK")
            .setURL("https://forms.gle/hSdepca1QxJGiQnz5")

    );

    message.channel.send({ content: "Solliciteer nu voor de ANWB!", components: [row] });


    
}

module.exports.help = {
    name: "knopanwb",
    category: "general",
    description: "De bot zegt hallo terug"
}
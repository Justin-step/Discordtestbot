const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const row = new discord.MessageActionRow().addComponents(

        new discord.MessageButton()
            .setLabel("POLITIE")
            .setStyle("LINK")
            .setURL("https://forms.gle/RdjS3RGFcaeXGt1f9")

    );

    message.channel.send({ content: "Solliciteer nu voor de politie!", components: [row] });


    
}

module.exports.help = {
    name: "knoppolitie",
    category: "general",
    description: "De bot zegt hallo terug"
}
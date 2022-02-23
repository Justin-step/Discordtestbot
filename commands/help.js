const botConfig = require("../botConfig.json");

module.exports.run = async (client, message, args) => {

    try {

        var prefix = botConfig.prefix;
    
        var respone = "**Bot commands**\r\n\n";
        var general = "**_Algemeen_**\r\n";
        var info = "\n**_Informatie_**\r\n";

        client.commands.forEach(command => {

         switch (command.help.category) {

            case "general":
                general += `${prefix}${command.help.name} - ${command.help.description}\r\n`;
                break;
            case "info":
                info += `${prefix}${command.help.name} - ${command.help.description}\r\n`;   
                break;
         }
            
            

        });

        respone += general + info;

        message.author.send(respone).then(() => {
            return message.reply("Alle commands kunt u zien in uw pm.");
        }).catch(() => {
            return message.reply("U heeft uw privé berichten uitstaan dus u heeft niks ontvangen");
        })
    
    } catch (error) {
        message.reply("Er is iets misgelopen")
    }

}

module.exports.help = {
    name: "help",
    category: "info",
    description: "geeft dit menu"
}
const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const options = [
        {
            label: "Events",
            value: "938161235055231073"
        },
        {
            label: "Mededelingen",
            value: "938161235072004166"
        },
        {
            label: "Updates",
            value: "938161235055231074"
        },
        {
            label: "Status",
            value: "938161235055231075"
        },
        {
            label: "Vacatures",
            value: "9938161235055231072"
        },
    ];

    const row = new discord.MessageActionRow()
        .addComponents(
            new discord.MessageSelectMenu()
                .setCustomId("Rolen")
                .setMinValues(0)
                .setMinValues(1)
                .setPlaceholder("Selecteer uw Rol")
                .addOptions(options)
        );
    return message.channel.send({content: "Selecteer hier uw rol", components: [row] });

}

module.exports.help = {
    name: "dropdown",
    category: "general",
    description: "U kunt uw rollen kiezen"
}
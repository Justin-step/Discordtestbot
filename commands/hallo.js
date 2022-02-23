module.exports.run = async (client, message, args) => {

    return message.channel.send("Goedendag");

}

module.exports.help = {
    name: "hallo",
    category: "general",
    description: "De bot zegt hallo terug"
}
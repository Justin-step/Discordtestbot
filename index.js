const { Client, Intents, Collection, Interaction } = require("discord.js");
const botConfig = require("./botConfig.json");
const fs = require("fs");

const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] 
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

for(const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.help.name, command);

    console.log(`De file ${command.help.name}.js is geladen`)
}


client.once("ready", () => {
    console.log(`${client.user.username} is online.`);
    client.user.setActivity("OnzDorp RP", { type: "PLAYING" });

    const statusOptions = [
        "Support",
        "Staff",
        "OnzDorp-RP"
    ]

    let counter = 0;

    
    let time = 1 * 60 * 1000;

    const updateStatus = () => {

        client.user.setPresence({

            status: "online",
            activities: [
                {
                    name: statusOptions[counter]
                }
            ]
        });

        if (++counter >= statusOptions.length) counter = 0;

        setTimeout(updateStatus, time);
    } 
    updateStatus();
});

client.on("interactionCreate", Interaction => {

    if(!Interaction.isSelectMenu()) {
        return;
    }

    const { customId, values, member } = Interaction;

    if (customId === 'roles') {
        
        const component = Interaction.component;

        const removed = component.options.filter((option) => {
            return !values.includes(option.value)
        });

        for (var id of removed) {
            member.roles.remove(id.value)
        }

        for (var id of values) {
            member.roles.add(id)
        }

        Interaction.reply({
            content: "Rollen geupdate!",
            ephemeral: true
        })

    }

})

client.on("guildMemberAdd", member => {

    var role = member.guild.roles.cache.get("943620036118077511")

    if(!role) return;

    member.roles.add(role);

    var channel = member.guild.channels.cache.get("938161235826978906")

    if (!channel) return;

    channel.send(`Welkom **${member}**, op OnzDorp-RP`);
   
})

client.on("messageCreate", async message => {

    if (message.author.bot) return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if(!message.content.startsWith(prefix)) return;

    const commandData = client.commands.get(command.slice(prefix.length));

    if(!commandData) return;

    var arguments = messageArray.slice(1);

    try{

        await commandData.run(client, message, arguments);

    } catch (error) {
        console.log(error);
        await message.reply("Er was een probleem tijdens het uitvoeren van deze command")
    }

})

client.login(process.env.token);

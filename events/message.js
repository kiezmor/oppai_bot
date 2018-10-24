module.exports = (bot, message) => {
    const config = require("../config.json");
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = bot.commands.get(command);
    if(cmd) {
        cmd.run(bot, message, args);
        console.log(`[Oppai BOT]: ${message.author.username}#${message.author.discriminator}:${message.author.id} used command ${command} ${args} on ${message.guild.name}:${message.guild.id} in ${message.channel.name}:${message.channel.id}`);
    }
    else
        message.reply("Wrong command: " + command);
};
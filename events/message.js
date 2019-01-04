module.exports = (bot, message) => {
    const conf = require("../json/config.json");
    const config = conf.config;
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    let cmd;
    if (bot.commands.has(command))
        cmd = bot.commands.get(command);
    else if (bot.aliases.has(command))
        cmd = bot.commands.get(bot.aliases.get(command));
    if(cmd) {
        cmd.run(bot, message, args);
        console.log(`[Oppai BOT]: ${message.author.username}#${message.author.discriminator}:${message.author.id} used command ${message.content} on ${message.guild.name}:${message.guild.id} in ${message.channel.name}:${message.channel.id}`);
    }
};
module.exports = (bot, message) => {
    const conf = require("../json/config.json");
    const config = conf.config;
    const getcmd = require("../core/utils.js").Getcmd;
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    let cmd;
    if (!(cmd = getcmd(bot, message, command))) return;
    if (cmd) {
        cmd.run(bot, message, args);
        if (message.guild)
            console.log(`${message.author.username}#${message.author.discriminator}:${message.author.id} used command ${message.content} on ${message.guild.name}:${message.guild.id} in ${message.channel.name}:${message.channel.id}`);
        else
            console.log(`${message.author.username}#${message.author.discriminator}:${message.author.id} used command ${message.content} in DM`);
    }
};
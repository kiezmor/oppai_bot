exports.run = (bot, message, args) => {
    const config = require("../config.json");
    if (message.author.id === config.owner) {
        if(!args || args.size < 1) return message.reply("Must provide a command name to reload.");
        let cmd = args.shift().toLowerCase();
        if(!bot.commands.has(cmd) && !bot.aliases.has(cmd)) {
            return message.reply("That command does not exist");
        }
        if (bot.aliases.has(cmd))
            cmd = bot.aliases.get(cmd);
        delete require.cache[require.resolve(`./${cmd}.js`)];
        const props = require(`./${cmd}.js`);
        bot.commands.delete(cmd);
        bot.aliases.forEach((props, alias) => {
            if (props === cmd) bot.aliases.delete(alias);
        });
        bot.commands.set(cmd, props);
        props.help.aliases.forEach(alias =>{
            bot.aliases.set(alias, props.help.name);
        })
        message.reply(`The command ${cmd} has been reloaded`);
    }
    else
        message.reply(`You're not the owner!`);
};
exports.help = {
    name: 'reload',
    aliases: ['r'],
    usage: "Use reload <cmd> to reload the command",
    require: "You ne to be the owner"
}
exports.run = (bot, message, args) => {
    const conf = require("../../json/config.json");
    const get = require("../../core/utils.js");
    const config = conf.config;
    if (message.author.id === config.owner || message.member.hasPermission('ADMINISTRATOR')) {
        if (args.length < 1) return message.reply("Must provide a command name to reload.");
        let command = args.shift().toLowerCase();
        if (!(cmd = get.Getcmd(bot, message, command))) return;
        mod = get.Getmod(bot, command);
        delete require.cache[require.resolve(`../${mod}/${cmd.help.name}.js`)];
        const props = require(`../${mod}/${cmd.help.name}.js`);
        bot.commands[mod].delete(cmd.help.name);
        bot.aliases.forEach((props, alias) => {
            if (props === cmd.help.name) bot.aliases.delete(alias);
        });
        bot.commands[mod].set(cmd.help.name, props);
        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        })
        message.reply(`The command ${cmd.help.name} has been reloaded`);
        console.log(`The command ${cmd.help.name} has been reloaded`);
    }
    else
        message.reply(`You're not the owner!`);
};
exports.help = {
    name: 'reload',
    aliases: ['r'],
    usage: "Use reload <cmd> to reload the command",
    require: "You ne to be the owner or Administrator"
}
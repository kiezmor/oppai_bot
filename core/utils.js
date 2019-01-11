module.exports.Getcmd = (bot, message, command) => {
    if (bot.aliases.has(command))
        c = bot.aliases.get(command);
    else
        c = command;
    if (mods = bot.mods.get(bot.binds.get(c)))
        return (bot.commands[mods].get(c));
    else
        message.channel.send('Unknow command!');
    return;
};

module.exports.Getmod = (bot, command) => {
    if (bot.aliases.has(command))
        c = bot.aliases.get(command);
    else
        c = command;
    return (bot.mods.get(bot.binds.get(c)));
};
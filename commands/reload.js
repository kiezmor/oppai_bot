exports.run = (client, message, args) => {
    const config = require("../config.json");
    if (message.author.id === config.owner) {
        if(!args || args.size < 1) return message.reply("Must provide a command name to reload.");
        const commandName = args[0];
        if(!client.commands.has(commandName)) {
            return message.reply("That command does not exist");
        }
        delete require.cache[require.resolve(`./${commandName}.js`)];
        client.commands.delete(commandName);
        const props = require(`./${commandName}.js`);
        client.commands.set(commandName, props);
        message.reply(`The command ${commandName} has been reloaded`);
    }
    else
        message.reply(`You're not the owner!`);
};
exports.help = {
    name: 'reload',
    usage: "Use reload <cmd> to reload the command",
    require: "You ne to be the owner"
}
exports.run = (bot, message, args) => {
    const conf = require("../../json/config.json");
    const config = conf.config;
    const get = require("../../core/utils.js");
    if (args != 0) {
        const command = args.shift().toLowerCase();
        cmd = get.Getcmd(bot, message, command);
        let ali = cmd.help.aliases.toString();
        message.channel.send({
            embed: {
                color: 65280,
                fields: [{
                    name: "Usage",
                    value: cmd.help.usage
                },
                {
                    name: "Aliases",
                    value: ali
                },
                {
                    name: "Require",
                    value: cmd.help.require
                }
                ],
            }
        });
    }
    else {
        var tmp = "";
        bot.mods.forEach((mods, key) => {
            tmp += `${mods.charAt(0).toUpperCase() + mods.substr(1)}: `;
            let i = 1;
            bot.commands[mods].forEach(cmd => {
                if ((bot.commands[mods].size) == i)
                    tmp += `\`${cmd.help.name}\`\n`;
                else
                    tmp += `\`${cmd.help.name}\`, `;
                i++;
            });
        });
        message.channel.send({
            embed: {
                color: 65280,
                fields: [{
                    name: "❯Bot prefix",
                    value: `${config.prefix}`
                },
                {
                    name: "❯List of commands",
                    value: tmp
                },
                {
                    name: "❯Usage",
                    value: "Use help `<command>` to see the usage"
                }
                ],
            }
        });
    }
}
exports.help = {
    name: 'help',
    aliases: ['h', '?'],
    usage: "Use help <cmd> to see the usage of command or juste help to see list of command",
    require: "There's no permission require"
}
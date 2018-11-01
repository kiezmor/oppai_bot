exports.run = async (bot, message, args) => {
    const config = require("../config.json");
    if (args != 0) {
        const command = args.shift().toLowerCase();
        if (!bot.commands.has(command) && !bot.aliases.has(command)) {
            return message.channel.send("Wrong command!");
        }
        if (bot.commands.has(command)) {
            cmd = bot.commands.get(command);
        }
        else if (bot.aliases.has(command)) {
            cmd = bot.commands.get(bot.aliases.get(command));
        }
        let ali = cmd.help.aliases.toString();
        message.channel.send({embed: {
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
        i = 0;
        bot.commands.forEach(function() {
            i++;   
        });
        j = 0;
        bot.commands.forEach(function(name) {
            if (j == (i - 1))
                tmp += '`' + name.help.name + '`';
            else
                tmp += '`' + name.help.name + '`, ';
            j++;
        });
        message.channel.send({embed: {
            color: 65280,
            fields: [{
                name: "❯Bot prefix",
                value: '`'+config.prefix+'`'
            },
            {
                name: "❯List of commands",
                value: tmp
            },
            {
                name: "❯Usage",
                value: "Use help `<cmd>` to see the usage of command"
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
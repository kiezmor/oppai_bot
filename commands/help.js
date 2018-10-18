exports.run = async (bot, message, args) => {
    const config = require("../config.json");
    if (args != 0)
    {
        bot.commands.forEach(function(name) {
            if (args == name.help.name){
                message.channel.send({embed: {
                    color: 3447003,
                    fields: [{
                        name: "Usage",
                        value: name.help.usage
                    },
                    {
                        name: "Require",
                        value: name.help.require
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                    icon_url: bot.user.avatarURL,
                    text: "Oppai BOT"
                    }
                }
                });
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
                tmp += name.help.name;
            else
                tmp += name.help.name + ', ';
            j++;
        });
        message.channel.send({embed: {
            color: 3447003,
            fields: [{
                name: "Bot prefix",
                value: config.prefix
            },
            {
                name: "List of commands",
                value: tmp
            },
            {
                name: "Usage",
                value: "Use help <cmd> to see the usage of cmd"
            }
            ],
            timestamp: new Date(),
            footer: {
            icon_url: bot.user.avatarURL,
            text: "Oppai BOT"
            }
        }
        });
    }
}  
exports.help = {
    name: 'help',
    usage: "Use help <cmd> to see the usage of cmd or juste help to see list of cmd",
    require: "There's no permission require"
}
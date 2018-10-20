exports.run = async (bot, message, args) => {
    const config = require("../config.json");
    if (args != 0)
    {
        bot.commands.forEach(function(name) {
            if (args == name.help.name){
                if (!(name.help.img)) {
                    message.channel.send({embed: {
                        color: 65280,
                        fields: [{
                            name: "Usage",
                            value: name.help.usage
                        },
                        {
                            name: "Require",
                            value: name.help.require
                        }
                        ],
                    }
                    });
                }
                else {
                    console.log("../assets/images/"+ name.help.name +".png");
                    message.channel.send({embed: {
                        color: 65280,
                        fields: [{
                            name: "Usage",
                            value: name.help.usage
                        },
                        {
                            name: "Require",
                            value: name.help.require
                        }
                        ],
                        image: {
                            url: name.help.img
                        }
                    }
                    });
                }
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
    usage: "Use help <cmd> to see the usage of command or juste help to see list of command",
    require: "There's no permission require"
}
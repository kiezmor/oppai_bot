exports.run = async (bot, message, args) => {
    var str = "";
    bot.commands.forEach(function(name){
        str += name.help.name + '\n';
    });
    message.channel.send({embed: {
        color: 3447003,
        fields: [{
            name: "List of commands",
            value: str
          },
        ],
        timestamp: new Date(),
        footer: {
          icon_url: bot.user.avatarURL,
          text: "Oppai BOT"
        }
      }
    });
}  
exports.help = {
    name: 'help',
    usage: "Use 'help <cmd> to see the usage of cmd or juste 'help to see list of cmd"
}
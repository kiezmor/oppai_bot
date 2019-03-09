exports.run = async (bot, message, args) => {
    if (message.member.voiceChannel) {
        disp = bot.disp.get(message.guild.id);
        disp.setVolume(args);
    } else {
        message.reply('💢 You need to join a voice channel first!');
    }
}

exports.help = {
    name: 'volume',
    aliases: ['vol'],
    usage: "Set the volume between 0.1 to 1",
    require: "Nothing!"
}
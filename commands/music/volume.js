exports.run = async (bot, message, args) => {
    if (!message.member.voiceChannel)
        return message.reply('💢 You need to join a voice channel first!');
    disp = bot.disp.get(message.guild.id);
    disp.setVolume(args);
}

exports.help = {
    name: 'volume',
    aliases: ['vol'],
    usage: "Set the volume between 0.1 to 1",
    require: "Nothing!"
}
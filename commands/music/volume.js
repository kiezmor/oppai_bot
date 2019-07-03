exports.run = async (bot, message, args) => {
    if (!message.member.voiceChannel)
        return message.reply('💢 You need to join a voice channel first!');
    if (!(args >= 1 && 10 >= args))
        return message.reply('volume is 1 to 10');
    bot.voicec[message.guild.id].disp.setVolume(args/10);
}

exports.help = {
    name: 'volume',
    aliases: ['vol'],
    usage: "Set the volume between 1 to 10",
    require: "Nothing!"
}
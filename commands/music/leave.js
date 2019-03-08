exports.run = async (bot, message, args) => {
    if (!message.guild)
        return message.channel.send('💢 You need to be on a server!');
    vc = bot.playing.get(message.guild.id);
    if (message.member.voiceChannel)
    {
        vc.leave();
        bot.playing.delete(message.guild.id);
        message.channel.send('I\'ve leaved!');
    } else {
        message.reply('💢 You need to join a voice channel first!');
    }
}

exports.help = {
    name: 'leave',
    aliases: ['l'],
    usage: "Use 'leave, I'll leave to your voice channel",
    require: "Nothing!"
}
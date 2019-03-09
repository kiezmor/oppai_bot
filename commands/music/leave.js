exports.run = async (bot, message) => {
    if (message.member.voiceChannel) {
        if (!message.guild)
            return message.channel.send('💢 You need to be on a server!');
        vc = bot.playing.get(message.guild.id);
        if (message.member.voiceChannel) {
            bot.queu[message.guild.id].forEach((val, key) => {
                console.log(bot.queu[message.guild.id].delete(key))
            });
            vc.leave();
            message.channel.send('I\'ve leaved!');
        } else {
            message.reply('💢 You need to join a voice channel first!');
        }
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
exports.run = async (bot, message) => {
    if (!message.member.voiceChannel)
        return message.reply('💢 You need to join a voice channel first!');
    vc = bot.playing.get(message.guild.id);
    bot.queu[message.guild.id].forEach((val, key) => {
        console.log(bot.queu[message.guild.id].delete(key))
    });
    bot.disp.delete(message.guild.id);
    vc.leave();
    message.channel.send('I\'ve leaved!');
}

exports.help = {
    name: 'leave',
    aliases: ['l'],
    usage: "Use 'leave, I'll leave to your voice channel",
    require: "Nothing!"
}
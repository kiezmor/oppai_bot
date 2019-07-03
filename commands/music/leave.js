exports.run = async (bot, message) => {
    if (!message.member.voiceChannel)
        return message.reply('💢 You need to join a voice channel first!');
    // vc = bot.voicechan.get(message.guild.id);
    // bot.queu[message.guild.id].forEach((val, key) => {
    //     bot.queu[message.guild.id].delete(key);
    // });
    // bot.disp.delete(message.guild.id);
    // bot.playing.delete(message.guild.id);
    // vc.leave();
    vc = bot.voicec[message.guild.id];
    vc.disp.end('leave')
    vc.connection.disconnect();
    delete bot.voicec[message.guild.id];
    message.channel.send('I\'m out!');
}

exports.help = {
    name: 'leave',
    aliases: ['l'],
    usage: "Use 'leave, I'll leave to your voice channel",
    require: "Nothing!"
}
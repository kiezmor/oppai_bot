exports.run = async (bot, message, args) => {
    if (!message.member.voiceChannel)
        return message.reply('💢 You need to join a voice channel first!');
    bot.voicec[message.guild.id].disp.end('Skip has been used!');
}

exports.help = {
    name: 'skip',
    aliases: ['sk'],
    usage: "Skip music",
    require: "Nothing!"
}
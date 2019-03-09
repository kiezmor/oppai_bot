exports.run = async (bot, message, args) => {
    if (!message.member.voiceChannel)
        return message.reply('💢 You need to join a voice channel first!');
    disp = bot.disp.get(message.guild.id);
    if (disp.paused == true)
        disp.resume();
    else
        disp.pause();
}

exports.help = {
    name: 'pause',
    aliases: [],
    usage: "Pause the music",
    require: "Nothing!"
}
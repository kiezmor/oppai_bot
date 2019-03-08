exports.run = async (bot, message, args) => {
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
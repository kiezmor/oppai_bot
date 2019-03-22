exports.run = async (bot, message, args) => {
    if (!message.guild)
        return message.channel.send('💢 You need to be on a server!');
    const Discord = require('discord.js');
    const ytdl = require('ytdl-core');
    const sm = args.join("");
    const play = require('../../core/play.js');
    const add = require('./queu.js');
    let validate = await ytdl.validateURL(sm);
    if (!validate)
        return message.channel.send("💢 Whoops, re-check the URL you gave me, I am getting an error while trying to play the song. ");
    if (!message.member.voiceChannel)
        return message.reply('💢 You need to join a voice channel first!');
    if (!bot.queu[message.guild.id])
        bot.queu[message.guild.id] = new Discord.Collection();
    bot.playing.set(message.guild.id, message.member.voiceChannel);
    if (!message.guild.voiceConnection)
        message.member.voiceChannel.join()
    pi = bot.queu[message.guild.id].first();
    if (bot.disp.has(message.guild.id) && !(pi == sm))
        add.run(bot, message, args);
    else {
        if (pi == sm)
            bot.queu[message.guild.id].delete(bot.queu[message.guild.id].firstKey());
        play(bot, message, sm);
    }
}

exports.help = {
    name: 'play',
    aliases: ['p'],
    usage: "Use 'play <URL>, I'll come play your music",
    require: "Nothing!"
}
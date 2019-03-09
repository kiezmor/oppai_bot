exports.run = async (bot, message, args) => {
    if (!message.guild)
        return message.channel.send('💢 You need to be on a server!');
    const ytdl = require('ytdl-core');
    const sm = args.join(" ");
    const queu = require('../../core/queu.js');
    let validate = await ytdl.validateURL(sm);
    if (!validate) 
        return message.channel.send("💢 Whoops, re-check the URL you gave me, I am getting an error while trying to play the song. ");
    if (message.member.voiceChannel) {
        bot.playing.set(message.guild.id, message.member.voiceChannel);
        if (!message.guild.voiceConnection)
            message.member.voiceChannel.join()
        disp = message.guild.voiceConnection.playStream(ytdl(sm, { filter: "audioonly" }));
        disp.setVolume(0.3);
        bot.disp.set(message.guild.id, disp);
        disp.on('end', () => {
            queu(bot, message);
        });
    } else {
        message.reply('💢 You need to join a voice channel first!');
    }
}

exports.help = {
    name: 'play',
    aliases: ['p'],
    usage: "Use 'play <URL>, I'll come play your music",
    require: "Nothing!"
}
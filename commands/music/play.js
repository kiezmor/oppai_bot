exports.run = async (bot, message, args) => {
    if (!message.guild)
        return message.channel.send('💢 You need to be on a server!');
    const ytdl = require('ytdl-core');
    const sm = args.join(" ");
    const queu = require('../../core/queu.js');
    let validate = await ytdl.validateURL(sm);
    if (!validate) 
        return message.channel.send("💢 Whoops, re-check the URL you gave me, I am getting an error while trying to play the song. ");
    if (bot.playing.has(message.guild.id))
        return message.channel.send("I'm already on your server, please add a music with 'queu <URL>")
    // console.log(bot.playing);
    if (message.member.voiceChannel) {
        // console.log(message.guild.id);
        bot.playing.set(message.guild.id, message.member.voiceChannel);
        message.member.voiceChannel.join()
        .then(connection => {
            message.channel.send('I have successfully connected to the channel!');
            disp = connection.playStream(ytdl(sm, { filter: "audioonly" }));
            disp.on('end', () => {
                queu(bot, message);
            });
        })
        .catch(console.log);
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
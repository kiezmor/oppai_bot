exports.run = async (bot, message, args) => {
    const ytdl = require('ytdl-core');
    const sm = args.join("");
    const add = require('./queu.js');
    const queu = require('../../core/queu.js');

    if (!message.guild) return message.channel.send('💢 You need to be on a server!');

    let validate = await ytdl.validateURL(sm);
    if (!validate)
        return message.channel.send("💢 Whoops, re-check the URL you gave me, I am getting an error while trying to play the song. ");
    var playing = false;
    if (!bot.voicec[message.guild.id])
        bot.voicec[message.guild.id] = {playing};
    if (message.member.voiceChannel && bot.voicec[message.guild.id].playing == false) {
        message.member.voiceChannel.join()
            .then(connection => {
                const disp = connection.playStream(ytdl(sm, { filter: "audioonly" }));
                disp.setVolume(0.5);
                playing = true;
                delete bot.voicec[message.guild.id];
                bot.voicec[message.guild.id] = { disp, connection, playing, sm };
                disp.on('end', res => {
                    console.log(res);
                    bot.voicec[message.guild.id].playing = false;
                    if (res != "leave")
                        queu(bot, message);
                });
            })
            .catch(console.log);
    } else if (bot.voicec[message.guild.id].playing == true) {
        add.run(bot, message, args);
    } else {
        message.reply('You need to join a voice channel first!');
    }
}


exports.help = {
    name: 'play',
    aliases: ['p'],
    usage: "Use 'play <URL>, I'll come play your music",
    require: "Nothing!"
}
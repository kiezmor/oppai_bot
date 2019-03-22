module.exports = (bot, message, sm) => {
    const queu = require('./queu.js');
    const ytdl = require('ytdl-core');
    disp = message.guild.voiceConnection.playStream(ytdl(sm, { filter: "audioonly" }));
    disp.setVolume(0.3);
    bot.disp.set(message.guild.id, disp);
    disp.on('end', () => {
        queu(bot, message);
    });
    disp.on('error', (err) => {
        return message.channel.send('error: ' + err).then(() => {
            console.log(err);
            queu(bot, message);
        })
    });
}
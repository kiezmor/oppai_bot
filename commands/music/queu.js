exports.run = async (bot, message, args) => {
    const Discord = require('discord.js');
    const ytdl = require('ytdl-core');
    const req = require('../../core/https.js');
    const key = require("../../json/config.json").config.youtube;
    const qu = require('../../core/queu.js');
    const sm = args.toString();
    let validate = await ytdl.validateURL(sm);

    if (!message.member.voiceChannel)
        return message.reply('💢 You need to join a voice channel first!');
    if (!bot.queu[message.guild.id])
        bot.queu[message.guild.id] = new Discord.Collection();
    if (args == "") {
        let i = 1;
        var tmp = "";
        if (!(bot.queu[message.guild.id].first()))
            return message.channel.send('there is no queu!')
        bot.queu[message.guild.id].forEach((mod, key) => {
            tmp += `${key} => ${mod}\n`;

        });
        message.channel.send(tmp);
    } else {
        var id = args.toString().split('=')[1].split('&')[0];
        var url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=100&playlistId=" + id + "&key=" + key;
        if (sm.indexOf('playlist?list=') > -1) {
            req(url).then((prom) => {
                content = JSON.parse(prom);
                content.items.forEach((vid) => {
                    var link = 'https://www.youtube.com/watch?v=' + vid.contentDetails.videoId;
                    queu = bot.queu[message.guild.id];
                    queu.set(queu.size, link);
                });
                if (!bot.voicec[message.guild.id])
                    return qu(bot, message);
            });
        } else {
            if (!validate)
                return message.channel.send("💢 Whoops, re-check the URL you gave me, I am getting an error while trying to play the song. ");
            queu = bot.queu[message.guild.id];
            queu.set(queu.size, args);
        }
    }
}

exports.help = {
    name: 'queu',
    aliases: [],
    usage: "Queu up music",
    require: "Nothing!"
}
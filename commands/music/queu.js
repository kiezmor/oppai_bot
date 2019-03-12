exports.run = async (bot, message, args) => {
    const Discord = require('discord.js');
    const ytdl = require('ytdl-core');
    const sm = args.join(" ");
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
        if (!validate)
            return message.channel.send("💢 Whoops, re-check the URL you gave me, I am getting an error while trying to play the song. ");
        queu = bot.queu[message.guild.id];
        queu.set(queu.size, args);
    }
}

exports.help = {
    name: 'queu',
    aliases: [],
    usage: "Queu up music",
    require: "Nothing!"
}
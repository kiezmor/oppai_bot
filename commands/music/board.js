exports.run = async (bot, message, args) => {
    if (!message.guild)
        return message.channel.send('💢 You need to be on a server!');
    const yt = require('ytdl-core');
    if (!bot.voicec[message.guild.id])
        return message.channel.send('💢 I\'m not playing!');
    const sm = bot.voicec[message.guild.id].sm;
    // console.log(sm)
    var tmp = "";
    if (!bot.queu[message.guild.id]) {
        tmp += "There's no queu!";
    } else {
        var t = bot.queu[message.guild.id].forEach((links, key) => {
            var c = links.toString();
            aytub = yt(c)
            aytub.on('info', (info) => {
                min = Math.floor(info.length_seconds / 60);
                sec = info.length_seconds - min * 60;
                time = min + ':' + sec;
                tmp += '[' + info.title + '](' + links + ') - ' + time + '\n';
            })
            aytub.on('error', (err) => {
                console.log(err);
            });
        })
        // await t;
    }
    // console.log(await tmp.toString().length)
    ytub = yt(sm)
    ytub.on('info', (info) => {
        min = Math.floor(info.length_seconds / 60);
        sec = info.length_seconds - min * 60;
        time = min + ':' + sec;
        var board = message.channel.send({
            embed: {
                title: "**❯Music board:**",
                description: "Currently playing : [" + info.title + "](" + sm + ") - " + time,
                color: 65280,
                thumbnail: { url: info.thumbnail_url },
                fields: [{
                    name: "**❯Playlist :**",
                    value: tmp
                }],
            }
        }).then(async function (message) {
            try {
                await message.react('⏯');
                await message.react('🔉');
                await message.react('🔊');
                await message.react('⏭');
                await message.react('❌');
            } catch (error) {
                console.error('One of the emojis failed to react.');
            }
        }).catch(console.log);
        bot.voicec[message.guild.id].board = board;
    });
    ytub.on('error', (err) => {
        console.log(err);
    });
    delete tmp;
    delete t;
}

exports.help = {
    name: 'board',
    aliases: ['b'],
    usage: "Music board(WIP)!",
    require: "Nothing!"
}
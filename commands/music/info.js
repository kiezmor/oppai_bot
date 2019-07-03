exports.run = async (bot, message, args) => {
    const req = require('../../core/https.js');
    const key = require("../../json/config.json").config.youtube;
    var id = args.toString().split('=')[1].split('&')[0];
    var url = "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=" + id + "&key=" + key;

    req(url).then((prom) => {
        content = JSON.parse(prom);
        message.channel.send({
            embed: {
                title: "**Video information :**",
                description: "**[" + content.items[0].snippet.title + "](" + args.toString().split('&')[0] + ") - " + content.items[0].contentDetails.duration.split('T')[1] + "** \n [" + content.items[0].snippet.channelTitle+"](https://www.youtube.com/channel/"+content.items[0].snippet.channelId+")",
                color: 0xFF0000,
                image: { url: content.items[0].snippet.thumbnails.maxres.url },
            }
        });
    });
}

exports.help = {
    name: 'info',
    aliases: ['i'],
    usage: "Use 'info <youtube-URL>, i'll send the information of the music",
    require: "Nothing!"
}
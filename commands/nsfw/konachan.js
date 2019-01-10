exports.run = async (bot, message, args) => {
    const req = require('../../core/https.js');
    if (message.channel.nsfw) {
        var url = 'https://konachan.com/post.xml?limit=100&tags=';
        req(bot, message, args, url);
    }
    else
        message.channel.send("This channel is not NSFW!");
}  
exports.help = {
    name: 'konachan',
    aliases: ['kch'],
    usage: "Use kch <tag or no> to see get a random image from selected tag(s)",
    require: "Your channel need to be NSFW"
}
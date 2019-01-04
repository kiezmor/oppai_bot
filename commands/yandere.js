exports.run = async (bot, message, args) => {
    const req = require('../core/https.js');
    if (message.channel.nsfw) {
        var url = 'https://yande.re/post.xml?limit=100&tags=';
        req(bot, message, args, url);
    }
    else
        message.channel.send("This channel is not NSFW!");
}  
exports.help = {
    name: 'yandere',
    aliases: ['yre'],
    usage: "Use yre <tag or no> to see get a random image from selected tag(s)",
    require: "Your channel need to be NSFW"
}
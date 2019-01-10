exports.run = async (bot, message, args) => {
    const req = require('../../core/https.js');
    if (message.channel.nsfw) {
        var url = 'https://gelbooru.com/index.php?page=dapi&s=post&limit=100&q=index&tags=';
        req(bot, message, args, url);
    }
    else
        message.channel.send("This channel is not NSFW!");
}  
exports.help = {
    name: 'gelbooru',
    aliases: ['gbu'],
    usage: "Use gbu <tag or no> to see get a random image from selected tag(s)",
    require: "Your channel need to be NSFW"
}
exports.run = async (bot, message, args) => {
    const req = require('../../core/https.js');
    if (message.channel.nsfw) {
        var url = 'https://safebooru.org/index.php?page=dapi&s=post&q=index&limit=100&tags=';
        req(bot, message, args, url);
    }
    else
        message.channel.send("This channel is not NSFW!");
}  
exports.help = {
    name: 'safebooru',
    aliases: ['sbu'],
    usage: "Use sbu <tag or no> to see get a random image from selected tag(s)",
    require: "Your channel need to be NSFW"
}
exports.run = async (bot, message, args) => {
    const req = require('../core/https.js');
    if (message.channel.nsfw) {
        var url = 'https://danbooru.donmai.us/posts.json?random=1&limit=1&tags=';
        req(bot, message, args, url);
    }
    else
        message.channel.send("This channel is not NSFW!");
}  
exports.help = {
    name: 'danbooru',
    aliases: ['dbu'],
    usage: "Use dbu <tag or no> to see get a random image from selected tag(s)",
    require: "Your channel need to be NSFW"
}
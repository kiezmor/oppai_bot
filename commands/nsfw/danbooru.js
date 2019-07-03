exports.run = async (bot, message, args) => {
    const req = require('../../core/https.js');
    if (message.channel.nsfw || !message.guild) {
        var argt = args.toString().replace(/,/g, '+');
        var url = 'https://danbooru.donmai.us/posts.json?random=1&limit=1&tags='+argt;
        
        req(url).then((prom) => {
            content = JSON.parse(prom);
            message.channel.send(content[0].file_url);
        });
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
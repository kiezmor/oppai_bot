exports.run = async (bot, message, args) => {
    if (message.channel.nsfw || !message.guild) {
        const req = require('../../core/https.js');
        const xml2js = require('xml2js');
        var parser = new xml2js.Parser();
        var argt = args.toString().replace(/,/g, '+');
        var url = 'https://rule34.xxx/index.php?page=dapi&s=post&limit=100&q=index&tags='+argt;

        req(url).then((prom) => {
            parser.parseString(prom, function (err, result) {
                var postCount = result.posts.$.count;
                if (postCount > 100) {
                    postCount = 100;
                }
                if (postCount > 0) {
                    var picNum = Math.floor(Math.random() * postCount) + 0;
                    var Pic = result.posts.post[picNum].$.file_url;
                    message.channel.send(Pic);
                } else {
                    message.channel.send("Nobody here but us chickens!");
                }
            });
        });
    }
    else
        message.channel.send("This channel is not NSFW!");
}
exports.help = {
    name: 'rule34',
    aliases: ['r34'],
    usage: "Use r34 <tag or no> to see get a random image from selected tag(s)",
    require: "Your channel need to be NSFW"
}
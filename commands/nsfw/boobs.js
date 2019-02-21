exports.run = async (bot, message, args) => {
    if (message.channel.nsfw || !message.guild) {
        const req = require('../../core/http.js');
        rng = Math.floor((Math.random() * 13460) + 1);
        var url = ('http://api.oboobs.ru/boobs/' + rng);
        req(bot, message, args, url);
    }
    else
        message.channel.send("This channel is not NSFW!");
}
exports.help = {
    name: 'boobs',
    aliases: ['boob'],
    usage: "Use boobs to get a random image of boobs",
    require: "Your channel need to be NSFW"
}
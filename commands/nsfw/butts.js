exports.run = async (bot, message, args) => {
    if (message.channel.nsfw || !message.guild) {
        const req = require('../../core/http.js');
        rng = Math.floor((Math.random() * 6199) + 1);
        var url = ('http://api.obutts.ru/butts/' + rng);
        req(bot, message, args, url);
    }
    else
        message.channel.send("This channel is not NSFW!");
}
exports.help = {
    name: 'butts',
    aliases: ['ass'],
    usage: "Use butts to get a random image of butt",
    require: "Your channel need to be NSFW"
}
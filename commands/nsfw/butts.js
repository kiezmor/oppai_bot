exports.run = async (bot, message, args) => {
    if (message.channel.nsfw) {
        const request = require('request');
        rng = Math.floor((Math.random() * 6199) + 1);
        var url = ('http://api.obutts.ru/butts/' + rng);
        request.get({
            url: url,
            json: true,
            headers: {
                'User-Agent': 'request'
            }
        }, (err, res, data) => {
            if (err) {
                console.log('Error:', err);
            } else if (res.statusCode !== 200) {
                console.log('Status:', res.statusCode);
            } else {
                if (data[0]) message.channel.send("http://media.obutts.ru/" + data[0].preview);
                else message.channel.send("💢 Error, Please try again!");
            }
        });
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
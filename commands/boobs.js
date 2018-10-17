exports.run = async (bot, message, args) => {
    const request = require('request');
    rng = Math.floor((Math.random() * 13199) + 1);
        var url = ('http://api.oboobs.ru/boobs/' + rng);
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
                if (data[0]) message.channel.send("http://media.oboobs.ru/" + data[0].preview);
                else message.channel.send("💢 Error, Please try again!");
            }
        });
}  
exports.help = {
    name: 'boobs',
    usage: "Use boobs to get a random image of boobs"
}
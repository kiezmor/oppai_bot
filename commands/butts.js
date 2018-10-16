exports.run = async (bot, message, args, request) => {
    rng = Math.floor((Math.random() * 6012) + 1);
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
exports.help = {
    name: 'butts'
}
exports.run = async (bot, message, args) => {
    const https = require("https");
    var url = 'https://random.dog/woof.json';
    https.get(url, function (res) {
        var body = '';

        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            content = JSON.parse(body);
            if (content.url)
                message.channel.send(content.url);
            else
                message.channel.send("Nobody here but us chickens!");
        });
    });
}

exports.help = {
    name: 'dog',
    aliases: [],
    usage: "Use dog for a random dog",
    require: "There's no permission require"
}
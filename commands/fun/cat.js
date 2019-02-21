exports.run = async (bot, message, args) => {
    const https = require("https");
    var url = 'https://aws.random.cat/meow';
    https.get(url, function (res) {
        var body = '';

        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            content = JSON.parse(body);
            if (content.file)
                message.channel.send(content.file);
            else
                message.channel.send("Nobody here but us chickens!");
        });
    });
}

exports.help = {
    name: 'cat',
    aliases: [],
    usage: "Use cat for a random cat",
    require: "There's no permission require"
}
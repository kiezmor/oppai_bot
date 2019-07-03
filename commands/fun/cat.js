exports.run = async (bot, message, args) => {
    const req = require('../../core/https.js');
    var url = 'https://aws.random.cat/meow';

    req(url).then((prom) => {
        content = JSON.parse(prom);
        message.channel.send(content.file);
    });
}

exports.help = {
    name: 'cat',
    aliases: [],
    usage: "Use cat for a random cat",
    require: "There's no permission require"
}
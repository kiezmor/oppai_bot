exports.run = async (bot, message, args) => {
    const req = require('../../core/https.js');
    var url = 'https://random.dog/woof.json';

    req(url).then((prom) => {
        content = JSON.parse(prom);
        message.channel.send(content.url);
    });
}

exports.help = {
    name: 'dog',
    aliases: [],
    usage: "Use dog for a random dog",
    require: "There's no permission require"
}
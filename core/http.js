module.exports = (bot, message, args, url) => {
    const http = require("http");
    const conf = require("../json/config.json");
    const config = conf.config;
    const arg = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = arg.shift().toLowerCase();
    const getcmd = require("../core/utils.js").Getcmd;
    const cmd = getcmd(bot, message, command);

    http.get(url, function (res) {
        var argr = res.headers['content-type'].split("/")[1].split(";")[0];
        var body = '';

        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            content = JSON.parse(body);
            if (cmd.help.name == "boobs") {
                if (content[0]) message.channel.send("http://media.oboobs.ru/" + content[0].preview);
                else message.channel.send("💢 Error, Please try again!");
            }
            else if (cmd.help.name == "butts") {
                if (content[0]) message.channel.send("http://media.obutts.ru/" + content[0].preview);
                else message.channel.send("💢 Error, Please try again!");
            }
        });
    });
};
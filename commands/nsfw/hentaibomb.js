exports.run = async (bot, message, args) => {
    const dbu = require("./danbooru.js");
    const gbu = require("./gelbooru.js");
    const kch = require("./konachan.js");
    const r34 = require("./rule34.js");
    const yre = require("./yandere.js");
    if (message.channel.nsfw || !message.guild) {
        ms = message.content;
        message.content = '\'dbu';
        dbu.run(bot, message, args)
        message.content = '\'gbu';
        gbu.run(bot, message, args)
        message.content = '\'kch';
        kch.run(bot, message, args)
        message.content = '\'r34';
        r34.run(bot, message, args)
        message.content = '\'yre';
        yre.run(bot, message, args)
        message.content = ms;
    }
    else
        message.channel.send("This channel is not NSFW!");
}
exports.help = {
    name: 'hentaibomb',
    aliases: ['hb'],
    usage: "A BIG HENTAI BOMB",
    require: "Your channel need to be NSFW"
}
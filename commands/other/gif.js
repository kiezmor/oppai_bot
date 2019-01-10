exports.run = async (bot, message, args) => {
    const req = require('../../core/https.js');
    const conf = require("../../json/config.json");
    const config = conf.config;
    var url = ('https://api.giphy.com/v1/gifs/random?api_key=' + config.giphy_key + '&tag=');
    req(bot, message, args, url);
}
exports.help = {
    name: 'gif',
    aliases: ['g'],
    usage: "Use gif <tag or no> to get a random gif from selected tag",
    require: "There's no permission require"
}
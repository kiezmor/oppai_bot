module.exports = (bot, message) => {
    const conf = require("../json/config.json");
    // const server = require("../core/server.js");
    const config = conf.config;
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
    bot.user.setActivity(config.activity);
    // server(bot);
};
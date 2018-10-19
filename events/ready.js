module.exports = (bot, message) => {
    const config = require("../config.json");
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
    bot.user.setActivity(config.activity);
};
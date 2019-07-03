module.exports = (bot, message) => {
        const play = require("../commands/music/play.js");
        const leave = require("../commands/music/leave.js");
        if (!bot.queu[message.guild.id])
                leave.run(bot, message);
        pi = bot.queu[message.guild.id].first();
        if (pi) {
                play.run(bot, message, pi);
                bot.queu[message.guild.id].delete(bot.queu[message.guild.id].firstKey());
        } else {
                console.log('Music finished!');
                leave.run(bot, message);
        }
}
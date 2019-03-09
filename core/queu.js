module.exports = (bot, message) => {
        vc = bot.playing.get(message.guild.id);
        disp = bot.disp.get(message.guild.id);
        const play = require("../commands/music/play.js");
        const leave = require("../commands/music/leave.js");

        if (bot.queu[message.guild.id].first()) {
                play.run(bot, message, bot.queu[message.guild.id].first());
                bot.queu[message.guild.id].delete(bot.queu[message.guild.id].firstKey())
        }
        else {
                message.channel.send('Music finished!');
                console.log('Music finished!');
                leave.run(bot, message);
        }
}
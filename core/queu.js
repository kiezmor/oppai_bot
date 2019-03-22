module.exports = (bot, message) => {
        vc = bot.playing.get(message.guild.id);
        disp = bot.disp.get(message.guild.id);
        const play = require("../commands/music/play.js");
        const leave = require("../commands/music/leave.js");
        pi = bot.queu[message.guild.id].first();
        if (pi) {
                play.run(bot, message, pi);
        } else {
                message.channel.send('Music finished!');
                console.log('Music finished!');
                leave.run(bot, message);
        }
}
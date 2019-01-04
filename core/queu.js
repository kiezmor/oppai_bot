module.exports = (bot, message) => {
        vc = bot.playing.get(message.guild.id);
        message.channel.send('Music finished!');
        console.log('Music finished!');
        vc.leave();
        // console.log(bot.playing);
        // console.log(vc.id);
        bot.playing.delete(message.guild.id);
        // console.log(bot.playing);
}
exports.run = async (bot, message, args) => {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
}  
exports.help = {
    name: 'ping',
    usage: "Use ping to see bot and api ms",
    require: "There's no permission require"
}
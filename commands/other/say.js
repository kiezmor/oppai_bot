exports.run = async (bot, message, args) => {
    if (args == "")
        return message.reply("I need a message!");
    const sayMessage = args.join(" ");
    // message.delete().catch(O_o => { });
    message.channel.send(sayMessage);
}

exports.help = {
    name: 'say',
    aliases: [],
    usage: "Use say <msg> to make bot say the <msg>",
    require: "There's no permission require"
}
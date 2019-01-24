exports.run = async (bot, message, args) => {
    if (message.member.hasPermission('BAN_MEMBERS'))
    {
        const user = message.mentions.users.first();
        const member = message.guild.member(user);
        const argss = args.toString().replace(/,/g, ' ');
        if (member) {
            member.ban(`[Oppai Bot]: ${argss}`).then(() => {
                message.reply(`Successfully banned ${user.tag}!`);
            }).catch(err => {
                message.reply(`I was unable to ban`);
                console.log(err);
            })
        }
    }
    else
        message.channel.send("You don't have the permission");
}

exports.help = {
    name: 'ban',
    aliases: [],
    usage: "Use ban @user <reason>",
    require: "You need the permission to ban"
}
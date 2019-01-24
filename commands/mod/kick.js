exports.run = async (bot, message, args) => {
    if (message.member.hasPermission('KICK_MEMBERS')) {
        const user = message.mentions.users.first();
        const member = message.guild.member(user);
        const argss = args.toString().replace(/,/g, ' ');
        if (member) {
            member.kick(`[Oppai Bot]: ${argss}`).then(() => {
                message.reply(`Successfully kicked ${user.tag}!`);
            }).catch(err => {
                message.reply(`I was unable to kick`);
                console.log(err);
            })
        }
    }
    else
        message.channel.send("You don't have the permission");
}

exports.help = {
    name: 'kick',
    aliases: [],
    usage: "Use kick @user <reason>",
    require: "You need the permission to kick"
}
exports.run = async (bot, message, args) => {
    if (message.member.hasPermission('MANAGE_MESSAGES')) {
        const deleteCount = parseInt(args[0], 10);
    if (!deleteCount || deleteCount < 2 || deleteCount > 100) 
        return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    const fetched = await message.channel.fetchMessages({
        limit: deleteCount
    });
    message.channel.bulkDelete(fetched).catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }
    else
        message.channel.send("You don't have the permission");
}  
exports.help = {
    name: 'prune',
    aliases: ['pr'],
    usage: "Use prune <nbr> to delete <nbr> of message(s)",
    require: "Require the permission: MANAGE_MESSAGES"
}
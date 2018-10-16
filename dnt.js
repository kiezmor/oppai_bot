if (command === "join" || command === "leave") {
        if (command === "leave")
        	return message.member.voiceChannel.leave();
        const sm = args.join(" ");
        let validate = await ytdl.validateURL(sm);
        if (!validate) 
        	return message.channel.send("💢 Whoops, re-check the URL you gave me, I am getting an error while trying to play the song. ");
        if (message.member.voiceChannel) {
            message.member.voiceChannel.join().then(connection => {
                message.reply('I have successfully connected to the channel!');
                connection.playStream(ytdl(sm, {
                    filter: "audioonly"
                }));
            }).catch(console.log);
        } else {
            message.reply('💢 You need to join a voice channel first!');
        }
    }

    if (command === "purge") {
        const deleteCount = parseInt(args[0], 10);
        if (!deleteCount || deleteCount < 2 || deleteCount > 100) 
        	return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
        const fetched = await message.channel.fetchMessages({
            limit: deleteCount
        });
        message.channel.bulkDelete(fetched).catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }
    
const tm = "'play https://www.youtube.com/watch?v=y6120QOlsfU3";
const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const request = require('request');
const fs = require('fs');
const util = require('util');
const { getInfo } = require('ytdl-getinfo');

const client = new Discord.Client();
const config = require("./config.json");

var log_file = fs.createWriteStream(__dirname + '/log/debug.log', {flags : 'a'});
var log_stdout = process.stdout;

console.log = function(d) {
    var currentDate = '[' + new Date().toUTCString() + '] ';
    log_file.write(currentDate + util.format(d) + '\n');
    log_stdout.write(currentDate + util.format(d) + '\n');
};

client.on("ready", () => {
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setActivity(`4 Reich inc.`);
});

client.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const voiceChannel = message.member.voiceChannel;

    time = function(smi, t) {
        getInfo(smi).then(info => {
            var date = new Date(null);
            date.setSeconds(info.items[0].duration);
            var result = date.toISOString().substr(11, 8);
            message.channel.send(t + '/' + result);
        })
    };

    if (command === "join") {
		if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('I couldn\'t connect to your voice channel...');
		    voiceChannel.join().then(connection => {message.reply('I have successfully connected to the channel!');}).catch(console.log);
    }
    if (command === "leave") {
        if (voiceChannel)
            return voiceChannel.leave();
    }
    if (command === "play") {
        const sm = args.join(" ");
        let dispatcher = message.guild.voiceConnection.playStream(ytdl(sm, {filter: "audioonly"}));
        let collector = message.channel.createCollector(m => m);
		collector.on('collect', m => {
            if (message.author.bot) return;
            if (message.content.indexOf(config.prefix) !== 0) return;

            const argss = m.content.slice(config.prefix.length).trim().split(/ +/g);
            const co = argss.shift().toLowerCase();
            
            switch(co) {
                case 'time':
                    const t = `time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}`;
                    time(sm, t);
            }
        });
    }
    if (command === "boobs") {
        rng = Math.floor((Math.random() * 13199) + 1);
        var url = ('http://api.oboobs.ru/boobs/' + rng);
        request.get({
            url: url,
            json: true,
            headers: {
                'User-Agent': 'request'
            }
        }, (err, res, data) => {
            if (err) {
                console.log('Error:', err);
            } else if (res.statusCode !== 200) {
                console.log('Status:', res.statusCode);
            } else {
                if (data[0]) message.channel.send("http://media.oboobs.ru/" + data[0].preview);
                else message.channel.send("💢 Error, Please try again!");
            }
        });
    }
    if (command === "butts" || command === "ass") {
        rng = Math.floor((Math.random() * 6012) + 1);
        var url = ('http://api.obutts.ru/butts/' + rng);
        request.get({
            url: url,
            json: true,
            headers: {
                'User-Agent': 'request'
            }
        }, (err, res, data) => {
            if (err) {
                console.log('Error:', err);
            } else if (res.statusCode !== 200) {
                console.log('Status:', res.statusCode);
            } else {
                if (data[0]) message.channel.send("http://media.obutts.ru/" + data[0].preview);
                else message.channel.send("💢 Error, Please try again!");
            }
        });
    }
    if (command === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }
    if (command === "say") {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o => {});
        message.channel.send(sayMessage);
    }
    if (command === "kick") {
        if (!message.member.roles.some(r => ["Administrator", "Moderator"].includes(r.name))) 
        	return message.reply("Sorry, you don't have permissions to use this!");
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member) 
        	return message.reply("Please mention a valid member of this server");
        if (!member.kickable) 
        	return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided";
        await member.kick(reason).catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
        message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
    }
    if (command === "ban") {
        if (!message.member.roles.some(r => ["Administrator"].includes(r.name))) 
        	return message.reply("Sorry, you don't have permissions to use this!");
        let member = message.mentions.members.first();
        if (!member) 
        	return message.reply("Please mention a valid member of this server");
        if (!member.bannable) 
        	return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided";
        await member.ban(reason).catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
        message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
    }
    if (command === "prune") {
        const deleteCount = parseInt(args[0], 10);
        if (!deleteCount || deleteCount < 2 || deleteCount > 100) 
        	return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
        const fetched = await message.channel.fetchMessages({
            limit: deleteCount
        });
        message.channel.bulkDelete(fetched).catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }
});
client.login(config.token);
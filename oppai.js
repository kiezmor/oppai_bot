const fs = require('fs');
const util = require('util');
const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("./config.json");

bot.commands = new Discord.Collection();

var log_file = fs.createWriteStream(__dirname + '/log/debug.log', {flags : 'a'});
var log_stdout = process.stdout;

console.log = function(d) {
    var currentDate = '[' + new Date().toUTCString() + '] ';
    log_file.write(currentDate + util.format(d) + '\n');
    log_stdout.write(currentDate + util.format(d) + '\n');
};

bot.on("ready", () => {
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
    bot.user.setActivity(`4 Reich inc.`);
});

bot.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    bot.user.setActivity(`Serving ${bot.guilds.size} servers`);
});

bot.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    bot.user.setActivity(`Serving ${bot.guilds.size} servers`);
});

fs.readdir('./commands/', (err, files) => {
    if(err) console.error(err);

    let cmds = files.filter(f => f.split('.').pop() === 'js');
    
    if(cmds.lenght <= 0) {
        return console.log('No command files found...');
    }

    console.log(`Loading ${files.lenght} commands...`);

    cmds.forEach((f, i) => {
        const command = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(command.help.name, command);
    }); 
});

bot.on("message", async message => {
    const prefix = config.prefix;
    // console.log(message.content);
    const messageArray = message.content.split(/\s+/g);
    // console.log(messageArray);
    const command = messageArray[0];
    const args = messageArray.slice(1);
    let cmd = bot.commands.get(command.slice(prefix.length));
  
    if(command.startsWith(prefix)){
        if(cmd) cmd.run(bot, message, args);
            console.log(`[Oppai BOT]: ${message.author.username}#${message.author.discriminator} used command ${command} ${args} on ${message.guild.name}:${message.guild.id} in ${message.channel.name}:${message.channel.id}`);
    }
});
bot.login(config.token);
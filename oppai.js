const fs = require('fs');
const util = require('util');
const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("./config.json");

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

var log_file = fs.createWriteStream(__dirname + '/log/debug.log', {flags : 'a'});
var log_stdout = process.stdout;

console.log = function(d) {
    var currentDate = '[' + new Date().toUTCString() + '] ';
    log_file.write(currentDate + util.format(d) + '\n');
    log_stdout.write(currentDate + util.format(d) + '\n');
};

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    console.log(`Loading a total of ${files.length} events.`);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        bot.on(eventName, event.bind(null, bot));
    });
});

fs.readdir('./commands/', (err, files) => {
    if(err) console.error(err);
    let cmds = files.filter(f => f.split('.').pop() === 'js');
    if(cmds.lenght <= 0) {
        return console.log('No command files found...');
    }
    console.log(`Loading ${files.length} commands...`);
    cmds.forEach((f, i) => {
        const command = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(command.help.name, command);
        command.help.aliases.forEach(alias =>{
            bot.aliases.set(alias, command.help.name)
        })
    }); 
});
bot.login(config.token);
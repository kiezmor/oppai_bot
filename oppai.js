const fs = require('fs');
const util = require('util');
const Discord = require('discord.js');
const bot = new Discord.Client();
const conf = require("./json/config.json");
const config = conf.config;

// Collections are like Map in JS
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

bot.mods = new Discord.Collection();
bot.binds = new Discord.Collection();

bot.playing = new Discord.Collection();
bot.queu = new Discord.Collection();
bot.disp = new Discord.Collection();

//Overwrite console.log function to get better log
var log_file = fs.createWriteStream(__dirname + '/log/debug.log', { flags: 'a' });
var log_stdout = process.stdout;

console.log = function (d) {
    var currentDate = '[' + new Date().toUTCString() + '] [Oppai BOT] ';
    log_file.write(currentDate + util.format(d) + '\n');
    log_stdout.write(currentDate + util.format(d) + '\n');
};

//Events binding to bot
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    console.log(`Loading a total of ${files.length} events.`);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        bot.on(eventName, event.bind(null, bot));
    });
});

//Commands Handler: get each command in each folder
fs.readdir('./commands/', (err, dir) => {
    if (err) console.error(err);
    dir.forEach((f, i) => {
        bot.commands[f] = new Discord.Collection();
        fs.readdir('./commands/' + f, (err, file) => {
            file.forEach(fs => {
                const cmd = require('./commands/' + f + '/' + fs);
                bot.commands[f].set(cmd.help.name, cmd);
                bot.binds.set(cmd.help.name, i);
                cmd.help.aliases.forEach(alias => {
                    bot.aliases.set(alias, cmd.help.name)
                });
            });
            bot.mods.set(i, f);
            console.log(`Loading ${file.length} commands on module ${f}`);
        });
    });
});

bot.login(config.token);
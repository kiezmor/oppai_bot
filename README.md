# Oppai Bot
A discord bot made by [kiezmor](https://github.com/kiezmor) in Node.JS using the API [Discord.js](https://discord.js.org/)

## Commands

* Fun: cat, dog

* Music: play, leave, queu, volume, pause

* NSFW: boobs, butts, danbooru, gelbooru, konachan, rule34, safebooru, yandere, hentaibomb

* Mod: prune, kick, ban

* Other: ping, say, help

* Owner/Admin: reload

## TO-DO List

- [ ] Music **(WIP)**
    - [x] play
    - [x] queue
    - [x] youtube
    - [ ] soundcloud
- [ ] 4chan
- [ ] Ecchi hub posting
- [ ] **AI???!!!!**
- [ ] User profil, rank & other
- [ ] random meme
- [ ] mute/unmute, voice and text
- [ ] config by server
- [ ] cleverbot

## Event Handler Explainer

Each event will need to have a file in that folder, named exactly like the event itself. So for `message` we want `./events/message.js`

### 1: Making an Event
The very basic code for making a event is this:

```js
module.exports = (bot, message) => {
    // do stuff
};
```

### 2: How events are load

This loop reads the `/events/` folder and attaches each event file to the appropriate `event`.

```js
// Load the contents of the `/events/` folder and each file in it.
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    console.log(`Loading a total of ${files.length} events.`);
    // Loops through each file in that folder
    files.forEach(file => {
        // Require the file itself in memory
        const event = require(`./events/${file}`);
        // Remove `.js`
        let eventName = file.split(".")[0];
        // Bind event to bot event
        bot.on(eventName, event.bind(null, bot));
    });
});
```

## Command Handler Explainer

It's also used as one of the most basic examples of a "proper" command handler where each command is in a separate file.
There are 3 parts to the command handler.

### 1: Making a Command:
The very basic code for making a command is this:

```js
exports.run = (bot, message, args) =>  {
    // do stuff
};

exports.help = {
    name: 'help',
    aliases: ['h', '?'],
    usage: "Command Description",
    require: "Command Description Require"
}
```

### 2: How the code loads the commands

This is the part that actually loads the commands in memory:

```js
// Uses Discord.Collection() mostly for the helpers like `map()`, to be honest.
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
// Load the contents of the `/commands/` folder and each file in it.
fs.readdir('./commands/', (err, files) => {
    (err) console.error(err);
    // Put all js file in cmds without `.js`
    let cmds = files.filter(f => f.split('.').pop() === 'js');
    console.log(`Loading ${files.length} commands...`);
    // Loops through each file
    cmds.forEach((f, i) => {
        // require the file itself in memory
        const command = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        // add the command to the Commands Collection
        bot.commands.set(command.help.name, command);
        // Loops through each Alias in that command
        command.help.aliases.forEach(alias =>{
            // add the alias to the Aliases Collection
            bot.aliases.set(alias, command.help.name)
        });
    });
});
```

### 3: How the bot runs the commands

The `message` handler is often the biggest part of a discord.js bot file... but here it's small and load from the event handler:

```js
// This is my event message
module.exports = (bot, message) => {
    // Require config for prefix
    const config = require("../config.json");
    //Check prefix and if the sender is a bot
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    // Slice to get args
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    // Shift first word and put it to lowercase in command
    const command = args.shift().toLowerCase();
    let cmd;
    //Check if command or aliases to get command
    if (bot.commands.has(command))
        cmd = bot.commands.get(command);
    else if (bot.aliases.has(command))
        cmd = bot.commands.get(bot.aliases.get(command));
    // Security
    if(cmd) {
        // Execute the command
        cmd.run(bot, message, args);
        console.log(`[BOT]: ${message.author.username} used command ${message.content}`);
    }
};
```

## Reload command

This is pretty useful, you can reload if you've modified your command without restart the bot

```js
exports.run = (bot, message, args) => {
    // Check if there's an args
    if(!args || args.size < 1) return message.reply("Must provide a command name to reload.");
    // Convert args to lowercase
    let cmd = args.shift().toLowerCase();
    // Check if command or aliases exist
    if(!bot.commands.has(cmd) && !bot.aliases.has(cmd)) {
        return message.reply("That command does not exist");
    }
    // If alliases, get the command
    if (bot.aliases.has(cmd))
        cmd = bot.aliases.get(cmd);
    // Delete the cache
    delete require.cache[require.resolve(`./${cmd}.js`)];
    // Require the command file
    const props = require(`./${cmd}.js`);
    // Delete command from `commands` Discord.Collection
    bot.commands.delete(cmd);
    // Removed each aliases from command
    bot.aliases.forEach((props, alias) => {
        if (props === cmd) bot.aliases.delete(alias);
    });
    // Set the command to `commands` Discord.Collection
    bot.commands.set(cmd, props);
    // Set each aliases to the command
    props.help.aliases.forEach(alias =>{
        bot.aliases.set(alias, props.help.name);
    })
    message.reply(`The command ${cmd} has been reloaded`);
};
```

The rest of the bot file is pretty much your standard stuff. Require some files, log some events, login with the token and stuff.

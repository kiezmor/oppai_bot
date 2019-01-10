module.exports.Getcmd = (bot, message, command) => {
    if (bot.aliases.has(command))
        c = bot.aliases.get(command);
    else
        c = command;
    if (mods = bot.mods.get(c))
        return (bot.commands[mods].get(c));
    else
        message.channel.send('Unknow command!');
    return;
};

module.exports.Getmod = (bot, command) => {
    if (bot.aliases.has(command))
        c = bot.aliases.get(command);
    else
        c = command;
    return (bot.mods.get(c));
};

module.exports.GetEachM = (bot) => {
    // const fs = require('fs');
    // i = 0;
    // fs.readdirSync('./commands/').forEach(file => {
    //     var mods = [];
    //     mods = Array.from(file);
    //     // i++;
    //     console.log(file)
    // })
    // console.log(mods[0])
    // return mods

    // fs.readdir('./commands/', (err, files) => {
    //     files.forEach(file => {
    //     //   console.log(file);
    //     var mods = [];
    //     mods = file;
    //     });
    //     // console.log(files)
    //     return mods;
    // });
    bot.mods.forEach((cmds, mods) => {
        console.log(`cmd ${cmds} & ${mods}`)
    });
};

module.exports.GetEachC = (bot, command) => {

};
exports.run = async (bot, message, args) => {
    const request = require('request');
    const config = require("../config.json");
    var argr = args.toString().replace(/,/g, '+');
    var url = ('https://api.giphy.com/v1/gifs/random?tag=' + argr + "&api_key=" + config.giphy_key);
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
            content =  JSON.parse(JSON.stringify(data));
            if (content.data.images)
                message.channel.send(content.data.images.original.url);
            else
                message.channel.send("Nothing found!");
        }
    });
}
exports.help = {
    name: 'gif',
    usage: "Use gif <tag or no> to get a random gif from selected tag",
    require: "There's no permission require"
}
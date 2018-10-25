exports.run = async (bot, message, args) => {
    if (message.channel.nsfw) {
        const https = require("https");
        const xml2js = require('xml2js');

        var argr = args.toString().replace(/,/g, '+');
        var url = 'https://rule34.xxx/index.php?page=dapi&s=post&limit=100&q=index&tags=' + argr;

        https.get(url, function(res){
            var body = '';
                    
            res.on('data', function(chunk){
                body += chunk;
            });
                    
            res.on('end', function(){
                var parser = new xml2js.Parser();
                parser.parseString(body, function (err, result) {
                    var postCount = result.posts.$.count - 1;
                    if(postCount > 100) {
                        postCount = 100;
                    }
                    if(postCount > 0) {
                        var picNum = Math.floor(Math.random() * postCount) + 0;
                        var r34Pic = result.posts.post[picNum].$.file_url;
                        message.channel.send(r34Pic);
                    } else {
                        message.channel.send("Nobody here but us chickens!");
                    }
                });
            });
        });
    }
    else
        message.channel.send("This channel is not NSFW!");
}  
exports.help = {
    name: 'rule34',
    aliases: ['r34'],
    usage: "Use r32 <tag or no> to see get a random image from selected tag(s)",
    require: "Your channel need to be NSFW"
}
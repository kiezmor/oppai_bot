module.exports = (bot, message, args, url) => {
const https = require("https");
const xml2js = require('xml2js');
var parser = new xml2js.Parser();
var argt = args.toString().replace(/,/g, '+');
var urlt = url + argt;

https.get(urlt, function(res){
    var argr = res.headers['content-type'].split("/")[1].split(";")[0];
    var body = '';
    
    res.on('data', function(chunk){
        body += chunk;
    });

    switch (argr) {
        case 'xml':
            res.on('end', function(){
                parser.parseString(body, function (err, result) {
                    var postCount = result.posts.$.count;
                    if(postCount > 100) {
                        postCount = 100;
                    }
                    if(postCount > 0) {
                        var picNum = Math.floor(Math.random() * postCount) + 0;
                        var Pic = result.posts.post[picNum].$.file_url;
                        if (Pic[0] == '/')
                            message.channel.send('https:' + Pic);
                        else
                            message.channel.send(Pic);
                    } else {
                        message.channel.send("Nobody here but us chickens!");
                    }
                });
            });
            break;
        case 'json':
            res.on('end', function(){
                content = JSON.parse(body);
                if (content.data)
                    message.channel.send(content.data.image_original_url);
                else if (content[0])
                    message.channel.send(content[0].file_url);
                else
                    message.channel.send("Nobody here but us chickens!");
            });
    }
});
}
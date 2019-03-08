module.exports = (bot) => {
    var http = require('http');
    console.log('Server started!')
    http.createServer(function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(req.url);
        res.end();
        // console.log(req)
    }).listen(8080);
};
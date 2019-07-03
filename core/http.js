module.exports = (url) => {
    const http = require("http");

    return new Promise((prom, err) => {
        http.get(url, function (res) {
            var body = '';

            res.on('data', function (chunk) {
                body += chunk;
            });

            res.on('error', (err) => {
                console.log(err);
            });

            res.on('end', function () {
                prom(body);
            });
        });
    });
};
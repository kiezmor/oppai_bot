module.exports = async (url) => {
    const https = require("https");

    return new Promise((prom, err) => {
        https.get(url, function (res) {
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
}
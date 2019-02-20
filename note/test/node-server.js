/**
 * @description Nodejs HTTP Simple Server
 * @param
 * @returns
 */

const url = require('url');
const http = require('http');
const qs = require('querystring');

const serverCtrl = {
    router: {
        '/404': function(req, res) {
            // response.setHeader('Content-Type', 'text/html');
            // response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
            res.writeHead(404, {
            });
            res.end(http.STATUS_CODES[404]);
        },
        '/api': function(req, res) {
            res.writeHead(200, {
                // 'Expires': 'Thu, 01 Dec 2020 16:00:00 GMT',
                'Cache-Control': 'max-age=3600',
                'Content-Type': 'application/json'
            });

            let ret = {
                code: 200,
                success: true
            }

            res.end(JSON.stringify(ret));
        },
        '/index.html': function(req, res) {
            let str = 
            `<html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Thimble Sample</title>
              </head>
              <body>
                <h1>Welcome to Thimble</h1>
                <p>
                  Make something <strong>amazing</strong> with the web!
                </p>
              </body>
              <script src="/api"></script>
            </html>`;

            res.writeHead(200, {
                // 'Expires': 'Thu, 01 Dec 2020 16:00:00 GMT',
                'Cache-Control': 'max-age=3600',
                'Content-Type': 'text/html; charset=utf-8'
            });

            res.end(str);
        },
        '/testjs': function(req, res) {

        }
    },
    server: http.createServer((req, res) => {
        let urlObj = url.parse(req.url);
        let pathname = urlObj.pathname;
        req.query = qs.parse(urlObj.query);

        serverCtrl.router[pathname]
            ? serverCtrl.router[pathname](req, res)
            : serverCtrl.router['/404'](req, res);
    }),
    startServer: function() {
        this.server.listen(8888, '0.0.0.0', () => {
            console.log('start server...');
        });
    }
};

serverCtrl.startServer();


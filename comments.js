// Create web server
import { createServer } from 'http';
import { parse } from 'url';
import { readFileSync, readFile } from 'fs';
import { parse as _parse } from 'querystring';

var comments = [];

// Create server
createServer(function (req, res) {
    var url_parts = parse(req.url);
    console.log(url_parts);
    // Handle POST request
    if (req.method == 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            var POST = _parse(body);
            console.log(POST);
            comments.push(POST.comment);
            res.writeHead(302, {'Location': 'index.html'});
            res.end();
        });
    }
    // Handle GET request
    else {
        var path = url_parts.pathname;
        console.log(path);
        if (path == '/') {
            var html = readFileSync('index.html');
            var commentsHTML = '';
            for (var i in comments) {
                commentsHTML += '<li>' + comments[i] + '</li>';
            }
            html = html.toString().replace('<!--comments-->', commentsHTML);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        }
        else {
            var filename = path.substring(1);
            console.log(filename);
            var type = 'text/plain';
            if (filename.endsWith('.html')) type = 'text/html';
            if (filename.endsWith('.css')) type = 'text/css';
            if (filename.endsWith('.jpg')) type = 'image/jpeg';
            if (filename.endsWith('.png')) type = 'image/png';
            readFile(filename, function (err, data) {
                if (err) {
                    res.writeHead(404, {'Content-Type': 'text/plain'});
                    res.end('Not found');
                }
                else {
                    res.writeHead(200, {'Content-Type': type});
                    res.end(data);
                }
            });
        }
    }
}).listen(8080);
console.log('Server running at http://localhost:8080/');

// Run server: node comments.js
// Access server: http://localhost:8080/
// Enter comments and submit
// Comments will be displayed on the page

// Exercise
// Add a form to the page that allows users to enter comments
// Store the comments in the server and display them on the


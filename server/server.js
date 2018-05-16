const express = require('express')
const path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

// app.get('/', function (req, res) {
//     res.sendfile(path.join(__dirname, '../dist/index.html'));
// });

app.use(express.static(path.join(__dirname, '../dist')))

io.on('connection', function (socket) {
    socket.emit('client', { hello: 'wsdfasfasf' });
    socket.on('on', function (data) {
        console.log(data);
    });
});


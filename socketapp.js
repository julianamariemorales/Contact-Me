var fs = require('fs')
var http = require('http');
var socketio = require('socket.io');
//var writableStream = fs.createWriteStream('htmllog.txt');


var server = http.createServer(function(req, res) {

    res.writeHead(200, { 'Content-type': 'text/html'});

    res.end(fs.readFileSync(__dirname + '/index.html'));

}).listen(8080, function() {

    console.log('Listening at: http://localhost:8080');

});

socketio.listen(server).on('connection', function (socket) {
    socket.on('message', function (msg) {
        console.log('Message Received: ', msg);
        socket.broadcast.emit('message', msg);

        //writableStream.write(msg);
        fs.appendFile('htmllog.txt', msg + '\r\n', (err) => {
          if (err) throw err;
          console.log('File updated!');
          });
    });

});

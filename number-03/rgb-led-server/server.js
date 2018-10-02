var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const port = process.env.PORT || 3000;

app.get('/ping', function (req, res) {
  res = res.status(200);
  res.send("pong");
});

server.listen(port);

console.log(`Server ready at ${port}`)

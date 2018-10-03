var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const port = process.env.PORT || 3000;

app.get('/ping', (req, res) => {
  res = res.status(200);
  res.send("pong");
});

app.get('/led-color', (req, res) => {
  res = res.status(200);
  console.log(`led-color R:${req.query.red} G:${req.query.green} B:${req.query.blue}`);
  io.emit('led-color', { red: req.query.red, green: req.query.green, blue: req.query.blue });
  res.send("Ok");
});

io.on('connection', socket => {
  console.log('Client contected');
});

server.listen(port);

console.log(`Server ready at ${port}`)

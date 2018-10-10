const port = process.env.PORT || 3000;
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/ping', (req, res) => {
  res = res.status(200);
  res.send("pong");
});

app.get('/led-color', (req, res) => {
  res = res.status(200);
  console.log(`led-color R:${req.query.red} G:${req.query.green} B:${req.query.blue}`);
  io.emit('led-color', req.query);
  res.send("Ok");
});

io.on('connection', socket => {
  console.log('Client contected');
});

server.listen(port);

console.log(`Server ready at ${port}`)

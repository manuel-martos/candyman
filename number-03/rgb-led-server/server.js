var express = require('express');
var http = require('http');
var app = express();

const port = process.env.PORT || 3000;

app.get('/ping', function (req, res) {
  res = res.status(200);
  res.send("pong");
});

http.createServer(app).listen(port);

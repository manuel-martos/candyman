const host = process.env.HOST || 'http://localhost';
const port = process.env.PORT || 3000;
const url = `${host}:${port}`;
var socket = require('socket.io-client')(url);

socket.on('connect', function(){
  console.log('connect');
});

socket.on('led-color', function(data){
  console.log(`led-color R: ${data.red} G: ${data.green} B: ${data.blue}`);
});

socket.on('disconnect', function(){
  console.log('disconnect');
});

console.log(`Client... ${url}`);

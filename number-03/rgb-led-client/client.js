const port = process.env.PORT || 3000;
const host = `http://localhost:${port}`;
var socket = require('socket.io-client')(host);

socket.on('connect', function(){
  console.log('connect');
});

socket.on('led-color', function(data){
  console.log(`led-color R: ${data.red} G: ${data.green} B: ${data.blue}`);
});

socket.on('disconnect', function(){
  console.log('disconnect');
});

console.log(`Client... ${host}`);

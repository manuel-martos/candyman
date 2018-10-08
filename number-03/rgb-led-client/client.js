const host = process.env.HOST || 'http://localhost';
const port = process.env.PORT || 3000;
const url = `${host}:${port}`;
const socket = require('socket.io-client')(url);
const SerialPort = require('serialport');

const serialPort = new SerialPort('/dev/ttyACM0', { baudRate: 57600 });

// Open errors will be emitted as an error event
serialPort.on('error', function(err) {
  console.log('Error: ', err.message);
})

// serialPort.on('data', console.log);

socket.on('connect', function(){
  console.log('connect');
});

socket.on('led-color', function(data){

  console.log(`led-color R: ${data.red} G: ${data.green} B: ${data.blue}`);

  var buffer = new Buffer(7);
  buffer[0] = 0x024;
  buffer[1] = 0x041;
  buffer[2] = data.red;
  buffer[3] = data.green;
  buffer[4] = data.blue;
  buffer[5] = 0x00a;
  buffer[6] = 0x00d;

  serialPort.write(buffer, function (err, result) {
            if (err) {
                console.log('Error while sending message : ' + err);
            }
            if (result) {
                console.log('Response received after sending message : ' + result);
            }
        });
});

socket.on('disconnect', function(){
  console.log('disconnect');
});

console.log(`Client... ${url}`);

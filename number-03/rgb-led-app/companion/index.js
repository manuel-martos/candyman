/*
 * Entry point for the companion app
 */

import { peerSocket } from "messaging";

const RGB_LED_SERVER_ENDPOINT = "https://rgb-led-server.herokuapp.com/led-color";

peerSocket.onopen = function() {
}

// Listen for the onmessage event
peerSocket.onmessage = function(evt) {
  // Output the message to the console
  console.log("ledColor -> " + JSON.stringify(evt.data));
  var url = RGB_LED_SERVER_ENDPOINT + "?red=" + evt.data.red + "&green=" + evt.data.green + "&blue=" + evt.data.blue;
  console.log(url);
  fetch(url)
    .then(console.log)
    .catch(console.log);
}
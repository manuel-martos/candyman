/*
 * Entry point for the watch app
 */
import document from "document";
import { peerSocket } from "messaging";

// UI Bindings
let spinner = document.getElementById("spinner");
let content = document.getElementById("content");
let error = document.getElementById("error");
let redTumblerD1 = document.getElementById("red-tumbler-d1");
let redTumblerD0 = document.getElementById("red-tumbler-d0");
let greenTumblerD1 = document.getElementById("green-tumbler-d1");
let greenTumblerD0 = document.getElementById("green-tumbler-d0");
let blueTumblerD1 = document.getElementById("blue-tumbler-d1");
let blueTumblerD0 = document.getElementById("blue-tumbler-d0");

// Led Color Data
let ledColor = { red: 0, green: 0, blue: 0};

function setupPeerSocket() {
  console.log("setupPeerSocket");
  peerSocket.onopen = function() {
    showElement(spinner, false);
    showElement(content, true);
    showElement(error, false);
    startLedComponentInterval();
  }

  peerSocket.onclose = function() {
    showElement(spinner, false);
    showElement(content, false);
    showElement(error, true);
  }

  peerSocket.onerror = function() {
    showElement(spinner, false);
    showElement(content, false);
    showElement(error, true);
  }
  
  setTimeout(function() {
    if (peerSocket.readyState !== peerSocket.OPEN) {
      showElement(spinner, false);
      showElement(content, false);
      showElement(error, true);
    }
  }, 20000);
}

function startLedComponentInterval() {
  setInterval(() => {
    if (updateComponent('red', redTumblerD1, redTumblerD0)
       || updateComponent('green', greenTumblerD1, greenTumblerD0)
       || updateComponent('blue', blueTumblerD1, blueTumblerD0)) {
      console.log("ledColor -> " + JSON.stringify(ledColor));
      if (peerSocket.readyState === peerSocket.OPEN) {
        peerSocket.send(ledColor);
      }
    }
  }, 1000);
}

function updateComponent(component, tumblerD1, tumblerD0) {
  let newValue = tumblerD1.value * 16 + tumblerD0.value;
  let updateRequired = ledColor[component]  != newValue;
  if (updateRequired) {
    ledColor[component] = newValue;
  }
  return updateRequired;
}

function startSpinner() {
  spinner.state = "enabled";
}

function showElement(element, show) {
  element.style.display = show ? "inline" : "none";
}

// Application starts here
setupPeerSocket();
startSpinner();
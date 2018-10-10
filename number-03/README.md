# Candyman Number 03

Hi again.

In this new Candyman project we've mixed a lot of stuff together. The main goal behind this project was to be able to stablish a communication channel between a Fitbit Ionic Smathwatch and an Arduino board with something plugged to it, in our case an RGB Led.

We've developed a Fitbit App with Fitbit Studio with the minimal UI to specify red, green and blue components. Those component values are sent to the RGB Led. Something like Philips Hue bulbs but under the DIY umbrella.

The middleware between the Smartwatch and the RGB Led includes Heroku, Raspberry Pi, Arduino and Node.js making this project really interesting from the implementation point of view.

![Technology Stack](/number-03/art/tech-stack.png "Technology Stack")

In order to explain everything about this project, we are going to move all the way starting from the RGB Led and Arduino and finish with the Fitbit Application, visiting each single piece of code involved in the project.

Let's start!

## Arduino Sketch

Our first stop is in the Arduino board with the RGB Led plugged to its GPIO port. Here you have the wiring for this setup:

![Arduino and RGB Wiring](/number-03/art/fritzing.png "Arduino and RGB Wiring")

You can take a look at the source code of the sketch that will control the RGB Led, placed at [/number-03/rgb-led-arduino](/number-03/rgb-led-arduino).

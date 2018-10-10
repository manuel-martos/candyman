# Candyman Number 03

Hi again.

In this new Candyman project we've mixed a lot of stuff together. The main goal behind this project was to be able to establish a communication channel between a Fitbit Ionic Smathwatch and an Arduino board with something plugged to it, in our case an RGB Led.

We've developed a Fitbit App with Fitbit Studio with the minimal UI to specify red, green and blue components. Those component values are sent to the RGB Led. Something like Philips Hue bulbs but under the DIY umbrella.

The middle-ware between the Smartwatch and the RGB Led includes Heroku, Raspberry Pi, Arduino and Node.js making this project really interesting from the implementation point of view.

![Technology Stack](/number-03/art/tech-stack.png "Technology Stack")

In order to explain everything about this project, we are going to move all the way starting from the RGB Led and Arduino and finish with the Fitbit Application, visiting each single piece of code involved in the project.

Let's start!

## Arduino Sketch

On our first stop we are going to take a look at how the Arduino and RGB Led have been composed and programmed. In this case, the led we've used is a Keyes RGB Led Board (part number KY-016). Here you have the wiring for this setup:

![Arduino and RGB Led](/number-03/art/fritzing.png "Arduino and RGB Led")

Arduino boards have the ability to establish serial communications through the USB port with other components. We've use this facility in order to receive the red, green and blue components to lit the led. These values are received encapsulated into a 7-bytes length packet. The bellow diagram details the content of that packet:

|Byte #0|Byte #1|Byte #2|Byte #3|Byte #4|Byte #5|Byte #6|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|`$`|`A`|red|green|blue|0x0a|0x0d|

Bytes #0 and #1 as well as bytes #5 and #6 are used as start and closing tags, in order to properly identify the packet itself and obtain the RGB component values.

The Arduino sketch basically establishes the serial port communication and waits until a full 7-bytes packet with the RGB values is recognized. When it happens, the Led is updated with the new values.

An important point to mention is the special setup that should be done with the Led Pins. They should be setup in `OUTPUT` pin mode in order to send PWM signals to the led. What the hell is PWM? basically is a modulation technique for encoding digital values. If you are interested this concept, take a look at this [link](https://en.wikipedia.org/wiki/Pulse-width_modulation).

You can take a look at the final source code of the sketch that controls the RGB Led [here](/number-03/rgb-led-arduino).

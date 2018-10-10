#define RED_PIN 9
#define GREEN_PIN 10
#define BLUE_PIN 11

#define START_TAG_BYTE1 0x024
#define START_TAG_BYTE2 0x041
#define END_TAG_BYTE1 0x00a
#define END_TAG_BYTE2 0x00d

#define START_TAG_POS 1
#define RED_COMPONENT_POS 2
#define GREEN_COMPONENT_POS 3
#define BLUE_COMPONENT_POS 4
#define END_TAG_POS1 5
#define END_TAG_POS2 6

#define COLOR_PACKET_SIZE 7

#define SERIAL_SPEED 57600

int serialCount = 0;
boolean synced = false;
uint8_t colorPacket[COLOR_PACKET_SIZE] = {
  START_TAG_BYTE1, START_TAG_BYTE2, 0, 0, 0, END_TAG_BYTE1, END_TAG_BYTE2
};

void setup() {
  Serial.begin(SERIAL_SPEED);
  while (!Serial); // wait for Leonardo enumeration, others continue immediately

  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);
}

void loop() {
  if (Serial.available() > 0) {
    char ch = Serial.read();
    if (!synced && ch != START_TAG_BYTE1) {
      return;
    }
    synced = true;
    if ((serialCount == START_TAG_POS && ch != START_TAG_BYTE2)
        || (serialCount == END_TAG_POS1 && ch != END_TAG_BYTE1)
        || (serialCount == END_TAG_POS2 && ch != END_TAG_BYTE2)) {
      serialCount = 0;
      synced = false;
      return;
    }

    if (serialCount > 0 || ch == START_TAG_BYTE1) {
      colorPacket[serialCount++] = ch;
      if (serialCount == COLOR_PACKET_SIZE) {
        analogWrite(RED_PIN, colorPacket[RED_COMPONENT_POS]);
        analogWrite(GREEN_PIN, colorPacket[GREEN_COMPONENT_POS]);
        analogWrite(BLUE_PIN, colorPacket[BLUE_COMPONENT_POS]);
        serialCount = 0;
      }
    }
  }
}

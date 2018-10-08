#define RED_PIN 9
#define GREEN_PIN 10
#define BLUE_PIN 11

uint8_t colorPacket[17] = { 0x024, 0x041, 0, 0, 0, 0x00a, 0x00d };

void setup() {
  Serial.begin(57600);
  while (!Serial); // wait for Leonardo enumeration, others continue immediately

  Serial.println("rgb-led-arduino ready...");
  
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);
}

int serialCount = 0;
int synced = 0;

void loop() {
  if (Serial.available() > 0) {
    char ch = Serial.read();
    Serial.print("ch -> ");
    Serial.println(ch);
    if (synced == 0 && ch != 0x024) {
      return;
    }
    synced = 1;
    if ((serialCount == 1 && ch != 0x041)
        || (serialCount == 5 && ch != 0x00a)
        || (serialCount == 6 && ch != 0x00d)) {
      serialCount = 0;
      synced = 0;
      return;
    }

    if (serialCount > 0 || ch == 0x024) {
      colorPacket[serialCount++] = ch;
      if (serialCount == 7) {
        uint8_t red = colorPacket[2];
        uint8_t green = colorPacket[3];
        uint8_t blue = colorPacket[4];
        
        Serial.println("Sending color to led...");
        Serial.print("RED: ");
        Serial.println(red);
        Serial.print("GREEN: ");
        Serial.println(green);
        Serial.print("BLUE: ");
        Serial.println(blue);
        serialCount = 0;
        analogWrite(RED_PIN, red);
        analogWrite(GREEN_PIN, green);
        analogWrite(BLUE_PIN, blue);
      }
    }
  }
}

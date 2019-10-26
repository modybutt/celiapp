/*
 * WiFi UDP Server for NeoPixel Control
 * 
 * A simple udp server using WiFi Provisioning setup and UDP to control NeoPixel
 * 
 * Don't light up all lights in white, as this will use too much power (external power and logic level converters would be needed then).
 * Valid UDP Packets: 0...Off, 1...5 different Color effects
 * 
 * Version: 1.0, 20191022 (Walter)
 */

#include <SPI.h>
#include <WiFi101.h>
#include <WiFiMDNSResponder.h>
#include <Adafruit_NeoPixel.h>

const int neoPin = 6;
const int numPixels = 47;

const int ledPin = 13; // LED pin for connectivity status indicator

char mdnsName[] = "celiwheel"; // the MDNS name that the board will respond to
                               // after WiFi settings have been provisioned


Adafruit_NeoPixel pixel = Adafruit_NeoPixel(numPixels, neoPin);

WiFiUDP udpServer;

char packetBuffer[255]; //buffer to hold incoming packet
char ack[] = "ack";       // a string to send back
int  port = 20000;

//wheels go in opposite directions with indices, therefore use these indirect indices instead
int ind[] = {0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,39,38,37,36,35,34,33,32,31,30,29,28,27,26,25,24,40,41,42,43,44,45,46};


//NeoPixel animation state
uint8_t red = 255;
uint8_t green = 255;
uint8_t blue = 255;
uint8_t animationState = 1;
int pos = 0, dir = 1; // Position, direction of "eye" for larson scanner animation

int bri = 100;


// Create a MDNS responder to listen and respond to MDNS name requests.
WiFiMDNSResponder mdnsResponder;

void setup() {
  
  //set pins for feather M0 shield
  WiFi.setPins(8,7,4,2); 

  //Initialize serial:
  Serial.begin(9600);

  //init NeoPixel
  pixel.begin(); // This initializes the NeoPixel library.

  for(uint8_t i=0; i<numPixels; i++) {
    pixel.setPixelColor(ind[i], pixel.Color(0,0,0)); // off
  }
  colorWipe(pixel.Color(bri, bri, bri), 15); 
  colorWipe(pixel.Color(0, 0, 0), 15); 
  pixel.show();

  // check for the presence of the shield:
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    // don't continue:
    while (true);
  }

  // configure the LED pin for output mode
  pinMode(ledPin, OUTPUT);

  // Start in provisioning mode:
  //  1) This will try to connect to a previously associated access point.
  //  2) If this fails, an access point named "wifi101-XXXX" will be created, where XXXX
  //     is the last 4 digits of the boards MAC address. Once you are connected to the access point,
  //     you can configure an SSID and password by visiting http://wifi101/
  WiFi.beginProvision();

  while (WiFi.status() != WL_CONNECTED) {
    // wait while not connected

    // blink the led to show an unconnected status
    digitalWrite(ledPin, HIGH);
    delay(500);
    digitalWrite(ledPin, LOW);
    delay(500);
  }

  // connected, make the LED stay on
  digitalWrite(ledPin, HIGH);

  udpServer.begin(port);

  // Setup the MDNS responder to listen to the configured name.
  // NOTE: You _must_ call this _after_ connecting to the WiFi network and
  // being assigned an IP address.
  if (!mdnsResponder.begin(mdnsName)) {
    Serial.println("Failed to start MDNS responder!");
    while(1);
  }

  Serial.print("Server listening at UDP port ");
  Serial.print(port);
  Serial.print(" on ");
  Serial.print(mdnsName);
  Serial.println(".local");

  // you're connected now, so print out the status:
  printWiFiStatus();
}


void loop() {
  // Call the update() function on the MDNS responder every loop iteration to
  // make sure it can detect and respond to name requests.
  mdnsResponder.poll();
  
  // if there's data available, read a packet
  int packetSize = udpServer.parsePacket();
  if (packetSize)
  {
    Serial.print("Received packet of size ");
    Serial.println(packetSize);
    Serial.print("From ");
    IPAddress remoteIp = udpServer.remoteIP();
    Serial.print(remoteIp);
    Serial.print(", port ");
    Serial.println(udpServer.remotePort());

    // read the packet into packetBufffer
    int len = udpServer.read(packetBuffer, 255);
    if (len > 0) packetBuffer[len] = 0;
    Serial.println("Contents:");
    Serial.println(packetBuffer);

    performCommand();

    // send a reply, to the IP address and port that sent us the packet we received
    //udpServer.beginPacket(udpServer.remoteIP(), udpServer.remotePort());
    //udpServer.write(ack);
    //udpServer.endPacket();
  }

}


void printWiFiStatus() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}

void performCommand() {
  animationState = packetBuffer[0] - '0';

  if (animationState == 0) {
    for(uint16_t i=0; i<numPixels; i++) {
      pixel.setPixelColor(ind[i], pixel.Color(0,0,0));
    }
    pixel.setBrightness(0);
  } else if (animationState == 1) {
    rainbow(20);
    pixel.show(); // This sends the updated pixel color to the hardware.
  } else if (animationState == 2){
    colorWipe(pixel.Color(114, 0, 255), 20);
    colorWipe(pixel.Color(0, 0, 0), 20);
    colorWipe(pixel.Color(0, 50, 255), 20);
    colorWipe(pixel.Color(0, 0, 0), 20);
    colorWipe(pixel.Color(0, 220, 255), 20);
    colorWipe(pixel.Color(0, 0, 0), 20);
    colorWipe(pixel.Color(255, 225, 255), 20);
    colorWipe(pixel.Color(0, 0, 0), 20);
    pixel.show(); // This sends the updated pixel color to the hardware.
  } else if (animationState == 3){
    for(uint16_t i=0; i<numPixels; i++) {
      pixel.setPixelColor(ind[i], pixel.Color(0,0,0));
    }
    pixel.setBrightness(bri);
    
    colorWipe(pixel.Color(0, 0, 255), 20);
    colorWipe(pixel.Color(0, 0, 0), 20);
    pixel.show(); // This sends the updated pixel color to the hardware.
  } else if (animationState == 4){
    for(uint16_t i=0; i<numPixels; i++) {
      pixel.setPixelColor(ind[i], pixel.Color(0,0,0));
    }
    pixel.setBrightness(bri);
    rainbowCycle(10);
    pixel.show(); // This sends the updated pixel color to the hardware.
  } else if (animationState == 5){
    colorWipe(pixel.Color(255, 0, 0), 20);
    colorWipe(pixel.Color(0, 255, 0), 20);
    colorWipe(pixel.Color(0, 0, 0), 20);
    pixel.show(); // This sends the updated pixel color to the hardware.
  }
}


//#############   NeoPixel functions
// Fill the dots one after the other with a color
void colorWipe(uint32_t c, uint8_t wait) {
  for(uint16_t i=0; i<numPixels; i++) {
      pixel.setPixelColor(ind[i], c);
      pixel.setBrightness(bri);
      pixel.show();
      delay(wait);
  }
}

void larsonScanner(uint32_t c, uint8_t wait){
  int j;
  
  for(uint16_t i=0; i<numPixels+5; i++) {
    // Draw 5 pixels centered on pos.  setPixelColor() will clip any
    // pixels off the ends of the strip, we don't need to watch for that.
    pixel.setPixelColor(ind[pos - 2], 0x003b85); // Dark red
    pixel.setPixelColor(ind[pos - 1], 0x005ed2); // Medium red
    pixel.setPixelColor(ind[pos] , 0x00c0ff); // Center pixel is brightest
    pixel.setPixelColor(ind[pos + 1], 0x005ed2); // Medium red
    pixel.setPixelColor(ind[pos + 2], 0x003b85); // Dark red
    pixel.setBrightness(bri);
    
    pixel.show();
    delay(wait);
    
    // Rather than being sneaky and erasing just the tail pixel,
    // it's easier to erase it all and draw a new one next time.
    for(j=-2; j<= 2; j++) {
      pixel.setPixelColor(ind[pos+j], 0);
    }
    
    // Bounce off ends of strip
    pos += dir;
    if(pos < 0) {
      pos = 1;
      dir = -dir;
    } else if(pos >= numPixels) {
      pos = numPixels - 2;
      dir = -dir;
    } 
  } 
  //colorWipe(pixel.Color(0, 0, 0), 20);
}



void flashRandom(int wait, uint8_t howMany) {
 
  for(uint16_t i=0; i<howMany; i++) {
    // get a random pixel from the list
    int j = random(numPixels);
    
    // now we will 'fade' it in 5 steps
    for (int x=0; x < 5; x++) {
      int r = red * (x+1); r /= 5;
      int g = green * (x+1); g /= 5;
      int b = blue * (x+1); b /= 5;
      
      pixel.setPixelColor(ind[j], pixel.Color(r, g, b));
      pixel.setBrightness(bri);
      pixel.show();
      delay(wait);
    }
    // & fade out in 5 steps
    for (int x=5; x >= 0; x--) {
      int r = red * x; r /= 5;
      int g = green * x; g /= 5;
      int b = blue * x; b /= 5;
      
      pixel.setPixelColor(ind[j], pixel.Color(r, g, b));
      pixel.setBrightness(bri);
      pixel.show();
      delay(wait);
    }
  }
  // LEDs will be off when done (they are faded to 0)
}

void rainbow(uint8_t wait) {
  uint16_t i, j;

  for(j=0; j<256; j++) {
    for(i=0; i<numPixels; i++) {
      pixel.setPixelColor(ind[i], wheel((i+j) & 255));
    }
    pixel.setBrightness(bri);
    pixel.show();
    delay(wait);
  }
}

// Slightly different, this makes the rainbow equally distributed throughout
void rainbowCycle(uint8_t wait) {
  uint16_t i, j;

  for(j=0; j<256*5; j++) { // 5 cycles of all colors on wheel
    for(i=0; i< numPixels; i++) {
      pixel.setPixelColor(ind[i], wheel(((i * 256 / numPixels) + j) & 255));
    }
    pixel.setBrightness(bri);
    pixel.show();
    delay(wait);
  }
}

//Theatre-style crawling lights.
void theaterChase(uint32_t c, uint8_t wait) {
  for (int j=0; j<10; j++) {  //do 10 cycles of chasing
    for (int q=0; q < 3; q++) {
      for (int i=0; i < numPixels; i=i+3) {
        pixel.setPixelColor(ind[i+q], c);    //turn every third pixel on
      }
      pixel.setBrightness(bri);
      pixel.show();

      delay(wait);

      for (int i=0; i < numPixels; i=i+3) {
        pixel.setPixelColor(ind[i+q], 0);        //turn every third pixel off
      }
    }
  }
}

//Theatre-style crawling lights with rainbow effect
void theaterChaseRainbow(uint8_t wait) {
  for (int j=0; j < 256; j++) {     // cycle all 256 colors in the wheel
    for (int q=0; q < 3; q++) {
      for (int i=0; i < numPixels; i=i+3) {
        pixel.setPixelColor(ind[i+q], wheel( (i+j) % 255));    //turn every third pixel on
      }
      pixel.setBrightness(bri);
      pixel.show();

      delay(wait);

      for (int i=0; i < numPixels; i=i+3) {
        pixel.setPixelColor(ind[i+q], 0);        //turn every third pixel off
      }
    }
  }
}

// Input a value 0 to 255 to get a color value.
// The colours are a transition r - g - b - back to r.
uint32_t wheel(byte wheelPos) {
  wheelPos = 255 - wheelPos;
  if(wheelPos < 85) {
    return pixel.Color(255 - wheelPos * 3, 0, wheelPos * 3);
  }
  if(wheelPos < 170) {
    wheelPos -= 85;
    return pixel.Color(0, wheelPos * 3, 255 - wheelPos * 3);
  }
  wheelPos -= 170;
  return pixel.Color(wheelPos * 3, 255 - wheelPos * 3, 0);
}

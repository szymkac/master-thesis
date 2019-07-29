#include <ESP8266WiFi.h>
#include <WebSocketsServer.h>
#include <ArduinoJson.h>
#include <FirebaseArduino.h>

//*******************************************************************
// SERIAL DATA CONTAINER
const byte numChars = 640;
char receivedChars[numChars];
boolean newData = false;
boolean responseSend = true;
//*******************************************************************

//*******************************************************************
// WIFI DATA CONTAINER
WebSocketsServer webSocket = WebSocketsServer(81);

char ssid[20] = "";
char password[20] = "";
char user[30] = "";
//*******************************************************************

void setup()
{
  Serial.begin(9600);
  Serial.println("Goodnight moon!");
}

void loop()
{
  webSocket.loop();
  receiveMessage();
  processNewData();
  if(!responseSend){
    Serial.println("Send:");
    Serial.write("<1>");
    responseSend = true;
  }
} 

//*******************************************************************
// SERIAL DATA FUNCTIONS
void setupServer(){
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n\n");
  Serial.print("IP Adress: ");
  Serial.print(WiFi.localIP());
  webSocket.begin();
  webSocket.onEvent(webSocketEvent);

  String firebasePath = "mgr-app-1995.firebaseio.com";
  Serial.print(firebasePath);
  Firebase.begin(firebasePath);
  Firebase.setString("users/" + String(user) + "/deviceIP", WiFi.localIP().toString());
  if (Firebase.failed()) {
        Serial.print("setting /number failed:");
        Serial.println(Firebase.error());  
  }
}

//propably don't need it
void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length){
  if(type == WStype_TEXT){
    Serial.println("Receive data from socket: \n");
    for(int i = 0; i < length; i++)
      Serial.print((char) payload[i]);
    Serial.println();
  }
}

//*******************************************************************

//*******************************************************************
// SERIAL DATA FUNCTIONS
void receiveMessage() {
    static boolean recvInProgress = false;
    static byte ndx = 0;
    char startMarker = '<';
    char endMarker = '>';
    char rc;
    while (Serial.available() > 0 && newData == false) {

        rc = Serial.read();

        if (recvInProgress == true) {
            if (rc != endMarker) {
                receivedChars[ndx] = rc;
                ndx++;
                if (ndx >= numChars) {
                    ndx = numChars - 1;
                }
            }
            else {
                receivedChars[ndx] = '\0';
                recvInProgress = false;
                ndx = 0;
                newData = true;
            }
        }
        else if (rc == startMarker) {
            recvInProgress = true;
        }
    }
}

void processNewData() {
    if (newData == true) {
        Serial.print("\nReceive: \n");
        Serial.println(receivedChars);
        Serial.println(receivedChars[6]);
        if(receivedChars[6] == 'C'){
            DynamicJsonBuffer jsonBuffer;
            JsonObject& root = jsonBuffer.parseObject(receivedChars);
            strcpy(ssid, root["ssid"]);
            strcpy(password, root["pass"]);
            strcpy(user, root["user"]);
            //Serial.println(ssid);
            //Serial.println(password);
            //Serial.println(user);

            setupServer();
        }
        else{
          Serial.print("\SEND TO SOCKET: \n");
          String message = String(receivedChars);
          webSocket.broadcastTXT(message);
        }
        newData = false;
        responseSend = false;
    }
}

//*******************************************************************

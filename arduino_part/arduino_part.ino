#include <SD.h>
#include <SPI.h>
#include <Wire.h>

boolean configDone = false;
//*******************************************************************

//*******************************************************************
// SERIAL DATA CONTAINERS
const byte numChars = 5;
char receivedChars[numChars];
boolean newData = false;
boolean getResponse = false;
//*******************************************************************

//*******************************************************************
// JSON DATA CONTAINERS
String JsonString = "";
//*******************************************************************

//*******************************************************************
// SENSORS DATA CONTAINERS
#define microswitchPin 2
//*******************************************************************

//*******************************************************************
// ACCEL DATA CONTAINERS
enum class AFS { A2G, A4G, A8G, A16G };
enum class GFS { G250DPS, G500DPS, G1000DPS, G2000DPS };
enum class MFS { M14BITS, M16BITS };

const uint8_t MPU9250_ADDRESS {0x68};
const uint8_t AK8963_ADDRESS {0x0C};

const uint8_t MPU9250_WHOAMI_DEFAULT_VALUE {0x71}; // 0x68????
const uint8_t AK8963_WHOAMI_DEFAULT_VALUE {0x48};

const uint8_t Mmode {0x06};

float magCalibration[3] = {0, 0, 0};

#define WHO_AM_I_MPU9250 0x75 // 1
#define AK8963_WHO_AM_I  0x00 // 1
#define PWR_MGMT_1       0x6B 
#define MPU_CONFIG       0x1A
#define SMPLRT_DIV       0x19
#define GYRO_CONFIG      0x1B
#define ACCEL_CONFIG     0x1C
#define ACCEL_CONFIG2    0x1D
#define INT_PIN_CFG      0x37
#define INT_ENABLE       0x38
#define AK8963_CNTL      0x0A
#define AK8963_ASAX      0x10
#define ACCEL_XOUT_H     0x3B
#define AK8963_ST1       0x02
#define AK8963_XOUT_L     0x03
#define DMP_INT_STATUS   0x39
#define INT_STATUS       0x3A

AFS AFSSEL = AFS::A16G;
GFS GFSSEL = GFS::G2000DPS;
MFS MFSSEL = MFS::M16BITS;

uint8_t i2c_err_;

float a[3], g[3], m[3];

const float aRes {16.0 / 32768.0};      
const float gRes {2000.0 / 32768.0};
const float mRes {10. * 4912. / 32760.0};

//*******************************************************************

void setup(){
  Serial.begin(9600);
  
  //INITS!!
  Wire.begin();
  delay(2000);
  initAccelGyro();
  readJsonConfig();
}

void loop(){
  receiveMessage();
    processNewData();
    
    if(!configDone || getResponse){
      if(configDone && getResponse){
        Serial.println("RESPONSE");
        delay(50);
        colectSensorsData();
        getResponse = false;
      }
      int length = JsonString.length() + 1;
      char ssid[length];
      JsonString.toCharArray(ssid, length);
      Serial.write(ssid, length);
      Serial.println("SEND");
    }
}
//*******************************************************************
// SENSORS DATA CONTAINERS

void colectSensorsData(){
  updateAccel();
    JsonString = "<";
    JsonString += readForce(A0);
    JsonString += ",";
    JsonString += readForce(A1);
    JsonString += ",";
    JsonString += readForce(A2);
    JsonString += ",";
    JsonString += readForce(A3);
    JsonString += ",";
    JsonString += readForce(A6);
    JsonString += ",";
    JsonString += readForce(A7);
    JsonString += ",";
    JsonString += readFloorSensor();
    JsonString += ",";
    JsonString += a[0];
    JsonString += ",";
    JsonString += a[1];
    JsonString += ",";
    JsonString += a[2];
    JsonString += ",";
    JsonString += g[0];
    JsonString += ",";
    JsonString += g[1];
    JsonString += ",";
    JsonString += g[2];
    JsonString += ",";
    JsonString += m[0];
    JsonString += ",";
    JsonString += m[1];
    JsonString += ",";
    JsonString += m[2];
    JsonString += ">";
}

uint8_t readForce(uint8_t SensorPin){
  return map(analogRead(SensorPin), 0, 1024, 0, 255);
}

uint8_t readFloorSensor(){
  if(!digitalRead(microswitchPin))
    return 1;
  return 0;
}

//*******************************************************************

//*******************************************************************
// ACCEL DATA CONTAINERS
void initAccelGyro(){
        uint8_t m_whoami = 0x00;
        uint8_t a_whoami = 0x00;
        
        m_whoami = isConnectedMPU9250();
        if (m_whoami){
            initMPU9250();

            a_whoami = isConnectedAK8963();
            if (a_whoami){
                initAK8963(magCalibration);
            }
            else{
              Serial.println("error 2");
            }
        }
        else{
          Serial.println("error 1");
        }
    }
    
    void updateAccel()
    {
        if (available())
        {
            updateAccelGyro();
            updateMag();
        }
    }
    
    void updateAccelGyro()
    {
        int16_t MPU9250Data[7];
        readMPU9250Data(MPU9250Data);

        a[0] = (float)MPU9250Data[0] * aRes;
        a[1] = (float)MPU9250Data[1] * aRes;
        a[2] = (float)MPU9250Data[2] * aRes;

        g[0] = (float)MPU9250Data[4] * gRes;
        g[1] = (float)MPU9250Data[5] * gRes;
        g[2] = (float)MPU9250Data[6] * gRes;
    }

    void readMPU9250Data(int16_t * destination)
    {
        uint8_t rawData[14];
        readBytes(MPU9250_ADDRESS, ACCEL_XOUT_H, 14, &rawData[0]);
        destination[0] = ((int16_t)rawData[0] << 8) | rawData[1] ;
        destination[1] = ((int16_t)rawData[2] << 8) | rawData[3] ;
        destination[2] = ((int16_t)rawData[4] << 8) | rawData[5] ;
        destination[3] = ((int16_t)rawData[6] << 8) | rawData[7] ;
        destination[4] = ((int16_t)rawData[8] << 8) | rawData[9] ;
        destination[5] = ((int16_t)rawData[10] << 8) | rawData[11] ;
        destination[6] = ((int16_t)rawData[12] << 8) | rawData[13] ;
    }
    
    void updateMag()
    {
        int16_t magCount[3] = {0, 0, 0};
        readMagData(magCount);
        m[0] = (float)(magCount[0] * mRes * magCalibration[0]);
        m[1] = (float)(magCount[1] * mRes * magCalibration[1]);
        m[2] = (float)(magCount[2] * mRes * magCalibration[2]);
    }

    void readMagData(int16_t * destination)
    {
        uint8_t rawData[7];  // x/y/z gyro register data, ST2 register stored here, must read ST2 at end of data acquisition
        if(readByte(AK8963_ADDRESS, AK8963_ST1) & 0x01) { // wait for magnetometer data ready bit to be set
            readBytes(AK8963_ADDRESS, AK8963_XOUT_L, 7, &rawData[0]);  // Read the six raw data and ST2 registers sequentially into data array
            uint8_t c = rawData[6]; // End data read by reading ST2 register
            if(!(c & 0x08)) { // Check if magnetic sensor overflow set, if not then report data
                destination[0] = ((int16_t)rawData[1] << 8) | rawData[0];  // Turn the MSB and LSB into a signed 16-bit value
                destination[1] = ((int16_t)rawData[3] << 8) | rawData[2];  // Data stored as little Endian
                destination[2] = ((int16_t)rawData[5] << 8) | rawData[4];
            }
        }
    }
    
    bool available()
    {
        return (readByte(MPU9250_ADDRESS, INT_STATUS) & 0x01);
    }
    
    bool isConnectedMPU9250()
    {
        byte c = readByte(MPU9250_ADDRESS, WHO_AM_I_MPU9250);
        return (c == MPU9250_WHOAMI_DEFAULT_VALUE);
    }

    bool isConnectedAK8963()
    {
        byte c = readByte(AK8963_ADDRESS, AK8963_WHO_AM_I);
        return (c == AK8963_WHOAMI_DEFAULT_VALUE);
    }
    
    void initMPU9250()
    {
        writeByte(MPU9250_ADDRESS, PWR_MGMT_1, 0x00);
        delay(100);
        writeByte(MPU9250_ADDRESS, PWR_MGMT_1, 0x01);
        delay(200);
        writeByte(MPU9250_ADDRESS, MPU_CONFIG, 0x03);
        writeByte(MPU9250_ADDRESS, SMPLRT_DIV, 0x04);
        uint8_t c = readByte(MPU9250_ADDRESS, GYRO_CONFIG);
        c = c & ~0x03;
        c = c & ~0x18;
        c = c | (uint8_t)GFSSEL << 3;
        writeByte(MPU9250_ADDRESS, GYRO_CONFIG, c );
        c = readByte(MPU9250_ADDRESS, ACCEL_CONFIG);
        c = c & ~0x18;
        c = c | (uint8_t)AFSSEL << 3;
        writeByte(MPU9250_ADDRESS, ACCEL_CONFIG, c);
        c = readByte(MPU9250_ADDRESS, ACCEL_CONFIG2);
        c = c & ~0x0F;
        c = c | 0x03;
        writeByte(MPU9250_ADDRESS, ACCEL_CONFIG2, c);
        writeByte(MPU9250_ADDRESS, INT_PIN_CFG, 0x22);
        writeByte(MPU9250_ADDRESS, INT_ENABLE, 0x01);
        delay(100);
    }
    
    void initAK8963(float * destination)
    {
        uint8_t rawData[3];
        writeByte(AK8963_ADDRESS, AK8963_CNTL, 0x00);
        delay(10);
        writeByte(AK8963_ADDRESS, AK8963_CNTL, 0x0F);
        delay(10);
        readBytes(AK8963_ADDRESS, AK8963_ASAX, 3, &rawData[0]);
        destination[0] =  (float)(rawData[0] - 128)/256. + 1.;
        destination[1] =  (float)(rawData[1] - 128)/256. + 1.;
        destination[2] =  (float)(rawData[2] - 128)/256. + 1.;
        writeByte(AK8963_ADDRESS, AK8963_CNTL, 0x00);
        delay(10);
        writeByte(AK8963_ADDRESS, AK8963_CNTL, (uint8_t)MFSSEL << 4 | Mmode);
        delay(10);
    }
    
    uint8_t readByte(uint8_t address, uint8_t subAddress)
    {
        uint8_t data = 0;
        Wire.beginTransmission(address);
        Wire.write(subAddress);
        i2c_err_ = Wire.endTransmission(false);
        Wire.requestFrom(address, (size_t)1);
        if (Wire.available()) data = Wire.read();
        return data;
    }
    
     void readBytes(uint8_t address, uint8_t subAddress, uint8_t count, uint8_t * dest)
    {
        Wire.beginTransmission(address);
        Wire.write(subAddress);
        i2c_err_ = Wire.endTransmission(false);
        uint8_t i = 0;
        Wire.requestFrom(address, count);
        while (Wire.available())
        {
            dest[i++] = Wire.read();
        }
    }
    
    void writeByte(uint8_t address, uint8_t subAddress, uint8_t data)
    {
        Wire.beginTransmission(address);
        Wire.write(subAddress);
        Wire.write(data);
        i2c_err_ = Wire.endTransmission();
    }
//*******************************************************************

//*******************************************************************
// SD DATA FUNCTIONS
void readJsonConfig(){
  if (SD.begin()){
    File file = SD.open("config.txt");
    //TODO readline
  
    if (file){
      file.close();
    }
  
    JsonString = "<";
    JsonString += "here one line from file";
    JsonString += ">";
  } 
  else{
    JsonString = "<{\"m\":\"C\",\"ssid\":\"Lucky\",\"pass\":\"123456789\",\"user\":\"FlWjVDVNGAZ6qzQFbBUaN3RSbtP2\"}>";
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
                receivedChars[ndx] = '\0'; // terminate the string
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
        if(strcmp(receivedChars, "1") == 0){
          configDone = true;
          getResponse = true;
        }
        newData = false;
    }
}
//*******************************************************************

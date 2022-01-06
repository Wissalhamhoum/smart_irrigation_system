#include <stdio.h>
#include <wiringPi.h>
#include <mosquitto.h>
#include <MQTTClient.h>
#include <string.h>

static const unsigned short signal = 18;
unsigned short data[5] = {0, 0, 0, 0, 0};

const char *mqtt_broker = "tcp://20.74.240.100"; //It's the address of the broker wich is the same address of the our Azur vm
const char *topic = "sensors/";
const int mqtt_port = 1883;



short readData()
{
	unsigned short val = 0x00;
	unsigned short signal_length = 0;
	unsigned short val_counter = 0;
	unsigned short loop_counter = 0;

	while (1)
	{
		// Count only HIGH signal
		while (digitalRead(signal) == HIGH)
		{
			signal_length++;

			// When sending data ends, high signal occur infinite.
			// So we have to end this infinite loop.
			if (signal_length >= 200)
			{
				return -1;
			}

			delayMicroseconds(1);
		}

		// If signal is HIGH
		if (signal_length > 0)
		{
			loop_counter++;	// HIGH signal counting

			// The DHT22 sends a lot of unstable signals.
			// So extended the counting range.
			if (signal_length < 10)
			{
				// Unstable signal
				val <<= 1;		// 0 bit. Just shift left
			}

			else if (signal_length < 30)
			{
				// 26~28us means 0 bit
				val <<= 1;		// 0 bit. Just shift left
			}

			else if (signal_length < 85)
			{
				// 70us means 1 bit
				// Shift left and input 0x01 using OR operator
				val <<= 1;
				val |= 1;
			}

			else
			{
				// Unstable signal
				return -1;
			}

			signal_length = 0;	// Initialize signal length for next signal
			val_counter++;		// Count for 8 bit data
		}

		// The first and second signal is DHT22's start signalso we ignore them
		if (loop_counter < 3)
		{
			val = 0x00;
			val_counter = 0;
		}

		// If 8 bit data input complete
		if (val_counter >= 8)
		{
			// 8 bit data input to the data array
			data[(loop_counter / 8) - 1] = val;

			val = 0x00;
			val_counter = 0;
		}
	}
}



int main(void)
{
	float humidity;
	float celsius;
	float fahrenheit;
	short checksum;
	int rc;
	struct mosquitto * mosq;
	int con ; 
	char tem [100];
	char hum [100]; 
	float x = 123.4567;
	char buf[100];
	
	//initializing mosquitto

	mosquitto_lib_init();
	

	mosq = mosquitto_new("publisher", 1, NULL);
	
	//connecting using password and username
	con = mosquitto_username_pw_set(mosq,"brokerUser", "broker"	);
	rc = mosquitto_connect(mosq, "20.74.240.100", 1883, 60);
	if(rc != 0){
		printf("Client could not connect to broker! Error Code: %d\n", rc);
		mosquitto_destroy(mosq);
		return -1;
	}
	printf("We are now connected to the broker!\n");


	// GPIO Initialization
	if (wiringPiSetupGpio() == -1)
	{
		printf("Initialization FAILED.\n");
		return -1;
	}

	//for (unsigned char i = 0; i < 10; i++)
	while(1)
	
	{
		char  t[] = "temperature in celsius: " ;
		char  h[]= "| Humidity: " ;
		pinMode(signal, OUTPUT);
	
		// Send out start signal
		digitalWrite(signal, LOW);
		delay(20);					
		pinMode(signal, INPUT);	

		readData();		// Read DHT22 signal

		// The sum is maybe over 8 bit like this: '0001 0101 1010'.
		// Remove the '9 bit' data using AND operator.
		checksum = (data[0] + data[1] + data[2] + data[3]) & 0xFF;

		// If Check-sum data is correct (NOT 0x00), display humidity and temperature
		if (data[4] == checksum && checksum != 0x00)
		{
			// * 256 is the same thing '<< 8' (shift).
			humidity = ((data[0] * 256) + data[1]) / 10.0;
			celsius = (((data[2] & 0x7F)*256) + data[3]) / 10.0; 
			// If 'data[2]' data like 1000 0000, It means minus temperature
			if (data[2] == 0x80)
			{
				celsius *= -1;
			}

			fahrenheit = ((celsius * 9) / 5) + 32;
			//snprintf(cel , sizeof(cel) , "TEMP: %6.2f ", celsius);
			

			// Display all data
			gcvt(celsius, 6, tem);
			strcat(t , tem);
			gcvt(humidity, 6, hum);
			strcat(t  , h);
			strcat(t  , hum);
			printf("TEMP: %6.2f *C (%6.2f *F) | HUMI: %6.2f %\n\n", celsius, fahrenheit, humidity);
			mosquitto_publish(mosq, NULL, "sensors/", 51 ,t, 0, 0);

	
		}

		else
		{
			printf("Invalid Data. Try again.\n\n");
		}

		// Initialize data array for next loop
		for (unsigned char i = 0; i < 5; i++)
		{
			data[i] = 0;
		}

		delay(2000);	// we will be sending every 2 seconds
	}
	mosquitto_disconnect(mosq);
	mosquitto_destroy(mosq);

	mosquitto_lib_cleanup();

	return 0;
}



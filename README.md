# smart_irrigation_system

## Introduction
Smart irrigation system is mobile application that is dedicated for farmers. The application displays the humidity and tempreture values measured by dht22 sensors in the field.

## Architecture of the project

![Architecture](/assets/architecture.png)

## IoT

1. The DHT22 sensor is connected to the raspberry pi 4 as following:
    - the yellow port in 3.3v
    - the orange port to th GPI018 port
    - the red port to the GND

2. Connect the raspberry to the vnc on the computer

3. clone the repository to raspberry

4. Generate the executable file by running
    ````
    cd ./SMART_IRRIGATION_SYSTEM/IOT
    gcc -o dht22.out dht22.c -lwiringPi -lmosquitto
    ./dht22.out
    ````
    Then, if the connection to the mqtt broker mosquitto hosted in the azure vm successeds, the values measured by the sessor will be displayed on the command line.

## Middleware

In the Azure virtual machine we have the mqtt broker mosquitto and the node js serve 
- to run the mqtt broker execute:
    ````
    sudo systemctl start moquitto
    ````
- to run the node js server:

    ````
    cd ./SMART_IRRIGATION_SYSTEM/api/main
    npm install
    sudo npm start
    ````


## Frontend
- First step: 
    Open the frontend directory in the editor of your choice (in our case we used WebStorm)

- Second step: 
    We get into "irrigapp" directory with cd irrigapp

- Third step: 
    Now we can run our app by typing ionic serve


## Testing
Bellow you can find examples of postman request to test signIn and signUp 
![Sign up](/assets/signup_exp.png)
![Sign up](/assets/signin_exp.png)

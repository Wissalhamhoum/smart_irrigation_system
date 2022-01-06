# smart_irrigation_system

## Introduction
Smart irrigation system is mobile application that is dedicated for farmers. The application displays the humidity and tempreture values measured by dht22 sensors in the field.

## Architecture of the project

![This is an image](/assets/architecture.png)

## IoT

1. The DHT22 sensor is connected to the raspberry pi 4 as following:
    - the yellow port in 3.3v
    - the orange port to th GPI018 port
    - the red port to the GND

2. Connect the raspberry to the vnc on the computer

3. clone the repository to raspberry

4. Generate the executable file by running

`cd ./SMART_IRRIGATION_SYSTEM/IOT`
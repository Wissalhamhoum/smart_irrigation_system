var express = require('express');

var router = express.Router();
var MqttData = require('./mqtt.provider')
/* GET mqtt listing. */

var mqttData = new MqttData();
//Connection to MQTT
const client = mqtt.connect('mqtts://mqtt.smartirrigationsystem.me', {
  port: 8883,
  username: 'mqttubuntu',
  password: '123456789'
});
//On received MQTT message
client.on('message', function (topic, message) {
    //Saving received data to MongoDB
    var mongomqttdata = {
      topic: topic,
      payload: message.toString()
    };
    const saved = mqttData.addmqtt(mongomqttdata)
    console.log("a new message is received from your sensors")
  });
  

exports.routesConfig = function (app) {
    app.get('/',[mqttData.getResults]);
}

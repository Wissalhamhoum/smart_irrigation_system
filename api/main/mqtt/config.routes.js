const mqtt = require('mqtt');
var MqttData = require('./mqtt.provider')
/* GET mqtt listing. */

var mqttData = new MqttData();
//Connection to MQTT
const client = mqtt.connect('20.74.240.100', {
  port: 1883,
  username: 'brokerUser',
  password: 'broker'
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

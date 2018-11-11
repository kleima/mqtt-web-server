
var express = require('express');
var app = express();
var mqtt = require('mqtt');
var count = 0;
var client = mqtt.connect("mqtt://localhost", { clientId: "nodejs" });
console.log("connected flag  " + client.connected);

app.get('/', function (req, res) {
    var topic = "nodeserver";
    var message = "node test message " + count;
    var options = {
        retain: true,
        qos: 1
    };
    client.publish(topic, message, options);
    res.send('Hello World!' + count);
    console.log('Publish ' + count);
    count += 1;
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

//handle incoming messages
client.on('message', function (topic, message, packet) {
    console.log("message is " + message);
    console.log("topic is " + topic);
});


client.on("connect", function () {
    console.log("connected  " + client.connected);
})

//handle errors
client.on("error", function (error) {
    console.log("Can't connect" + error);
    process.exit(1)
});
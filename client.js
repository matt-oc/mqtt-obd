// controller.js
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

var garageState = ''
var connected = true

client.on('connect', () => {
  client.subscribe('pi/connected')
})

client.on('message', (topic, message) => {
  switch (topic) {
    case 'pi/connected':
      return handlePiConnected(message)
  }
  console.log('No handler for topic %s', topic)
})

function handlePiConnected (message) {
  console.log('pi connected status %s', message)
  connected = (message.toString() === 'true')
}


function sendMsg () {
  // can only open door if we're connected to mqtt and door isn't already open
  if (connected) {
    // Ask the door to open
    client.publish('pi/test', 'true')
  }
}



// --- For Demo Purposes Only ----//

// simulate opening garage door
setTimeout(() => {
  console.log('Send...')
  sendMsg()
}, 5000)

// simulate closing garage door
setTimeout(() => {
  console.log('Send....')
  sendMsg()
}, 20000)

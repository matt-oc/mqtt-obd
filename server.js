// garage.js
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')



client.on('connect', () => {
  client.subscribe('pi/data')
  client.subscribe('pi/test')

  // Inform controllers that pi is connected
  client.publish('pi/connected', 'true')
  //sendStateUpdate()
})

client.on('message', (topic, message) => {
  console.log('received message %s %s', topic, message)
  switch (topic) {
    case 'pi/data':
      return printFile(message)
    case 'pi/test':
      return printTest(message)
  }
})


function printFile (message) {
  if (message) {
    console.log('worked')
  //  state = 'opening'
  //  sendStateUpdate()

  }
}

function printTest (message) {
  if (message) {
    console.log('worked')

    // simulate door closed after 5 seconds (would be listening to hardware)

  }
}

/**
 * Want to notify controller that garage is disconnected before shutting down
 */
function handleAppExit (options, err) {
  if (err) {
    console.log(err.stack)
  }

  if (options.cleanup) {
    client.publish('pi/connected', 'false')
  }

  if (options.exit) {
    process.exit()
  }
}

/**
 * Handle the different ways an application can shutdown
 */
process.on('exit', handleAppExit.bind(null, {
  cleanup: true
}))
process.on('SIGINT', handleAppExit.bind(null, {
  exit: true
}))
process.on('uncaughtException', handleAppExit.bind(null, {
  exit: true
}))

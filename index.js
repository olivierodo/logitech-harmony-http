const HarmonyHub = require('harmonyhub-api').HarmonyHub
const httpServer = require('./server.js')
const https = require('http')

const config = {
  HUB_HOST: process.env.HUB_HOST,
  HUB_REMOTE_ID: process.env.HUB_REMOTE_ID,
  PORT: process.env.PORT || 8080
}

let ready = Promise.resolve()
// If the HUB REMOTE ID is not defined we will get it
if (!config.HUB_REMOTE_ID) {
  ready = new Promise((resolve, reject) => {
    const data = JSON.stringify({
      "id ": 1,
      "cmd": "setup.account?getProvisionInfo",
      "params": {}
    })
    
    const options = {
      hostname: config.HUB_HOST,
      port: 8088,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://sl.dhg.myharmony.com',
        'Content-Length': data.length
      }
    }
    
    const req = https.request(options, res => {
      res.on('data', d => {
        config.HUB_REMOTE_ID = JSON.parse(d).data.activeRemoteId
        resolve()
      })
    })
    req.on('error', error => { 
      reject(error)
    }).write(data)
    req.end()
  })
}

ready
  .then(() => {
    const hub = new HarmonyHub(config.HUB_HOST, config.HUB_REMOTE_ID)
    let http = httpServer(hub, config.PORT)
    
    hub
      .on('connect', () => {
        http.set('hubConnected', true)
        console.log('connect')
      })
      .on('message', () => {
        console.log('message')
      })
      .on('close', () => {
        http.set('hubConnected', false)
        console.log('close')
      })
      .on('error', () => {
        console.log('errpr')
      })
  })
  .catch(err => {
    console.log(err)
  })

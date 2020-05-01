const express = require('express')

module.exports = function(hub, port) {
 let app = express()
  .set('hubConnected', false)
  .use(express.json())
  .use((req, res, next) => {
    if(req.app.get('hubConnected')) return next()
    hub.connect()
      .then(_ => next())
      .catch(_ => next)
  })
  .get('/', (req, res) => {
    res.json(hub.config)
  })
  .get('/:deviceName', (req, res) => {
    let device = hub.config.device.find( device => (new RegExp(req.params.deviceName, 'i')).test(device.label))
    res.json(device)
  })
  .post('/:deviceName/action', (req, res) => {
    let device = hub.config.device.find( device => (new RegExp(req.params.deviceName, 'i')).test(device.label))
    let power = device.controlGroup.find(_ => _.name === 'Power')
    if (!power) return res.status(404).json({ message : 'No power'})

    let cmd = power.function.find(cm => (new RegExp(req.body.type, 'i')).test(cm.name))
    if (!cmd) return res.status(404).json({ message : 'No command'})

    hub.sendCommand(cmd.name, device.id)
    res.sendStatus(204)
  })

  app.listen(port, () => {
    console.log(`Http server is running on the port ${port}`)
  })
  return app
}

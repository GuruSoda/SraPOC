const express = require('express')
const router = express.Router()

const os = require('os')
const process = require('process');

router.get('/', function(req, res) {
  res.send(
      {
          apis : ['/', '/info', '/stdout', '/hostname', '/falla', '/headers', '/esperar']
      });
});

router.get('/info', function(req, res) {
  let data = {}

  data.env = process.env
  data.pid = process.pid
  data.currenDirectory = process.cwd()
  data.userID = process.getuid

  data.hostname = os.hostname()
  data.uptime = os.uptime()
  data.loadavg = os.loadavg()
  data.totalmem = os.totalmem()
  data.homedir = os.homedir()
  data.Interfaces = os.networkInterfaces()
  data.freemem = os.freemem()
  data.arch = os.arch()
  
  res.json(data);

  console.log(JSON.stringify(data))
});

router.post('/stdout', function(req, res) {
  res.json(req.body)

  console.log(JSON.stringify(req.body))
})

router.get('/hostname', function(req, res) {

  let data = { hostname: os.hostname() }

  console.log(JSON.stringify(data))

  res.set("Connection", "close")

  if (req.query.salida === 'json' || !req.query.salida)
    res.json(data)
  else if (req.query.salida === 'txt')
    res.send(data.hostname + '\n')

//  setTimeout(function() { res.json(data) }, 250)

// corta el socket
// hasta la version 13.0
//  res.connection.destroy();
// a partir de la version 13.0
//  res.socket.destroy()
//  res.json(data)
})

router.get('/falla', function(req, res) {

  console.log(JSON.stringify(nada))

  res.json({})
})

router.get('/headers', function(req, res) {

  console.log(JSON.stringify(req.headers))

  if (!req.query.salida) res.json(req.headers)

  if (req.query.salida === 'json')
    res.json(req.headers)
  else if (req.query.salida === 'txt') {
    let encabezado = ""

    for (let key in req.headers) {
      encabezado += key + ':' + req.headers[key] + '\n'
    }

    res.send(encabezado)
  } else if (req.query.salida === 'nada') {
    res.json()
  }
})

router.get('/esperar/:milisegundos', function(req, res) {
//  console.log(req.params.milisegundos)

  setTimeout(function() { res.send('Se esperaron ' + req.params.milisegundos + ' Milisegundos.\n')}, req.params.milisegundos)
})

module.exports = router

const express = require('express')
const router = express.Router()

const os = require('os')
const process = require('process');

router.get('/', function(req, res) {
  res.send(
      {
          apis : ['/', '/info', '/stdout', '/hostname', '/falla', '/headers']
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

  res.json(data)

  console.log(JSON.stringify(data))
})

router.get('/falla', function(req, res) {

  console.log(JSON.stringify(nada))

  res.json({})
})

router.get('/headers', function(req, res) {

  console.log(JSON.stringify(req.headers))

  res.json(req.headers)
})

module.exports = router;

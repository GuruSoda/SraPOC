const express = require('express');
const router = express.Router();

const mame = require('../models/armame')

const armame = new mame()

armame.open()

router.get('/version', function(req, res) {
    
    armame.version().then(function(nombres) {
        console.log(JSON.stringify(nombres))
        res.json(nombres)
    }).catch(function(error) {
        res.json({})
        console.log(error)
    })

});

router.get('/gamesv3', function(req, res) {
    
    armame.gamesMemory().then(function(nombres) {
        res.json(nombres)
    }).catch(function(error) {
        res.json([])
        console.log(error)
    })

});

router.get('/gamesv2', function(req, res) {

    armame.gamesDescription().then(function(nombres) {
        res.json(nombres)
    }).catch(function(error) {
        res.json([])
        console.log(error)
    })

});

router.get('/games', function(req, res) {

    armame.games().then(function(nombres) {
        console.log(JSON.stringify(nombres))
        res.json(nombres)
    }).catch(function(error) {
        res.json([])
        console.log(error)
    })

});

router.get('/games/:name', function(req, res) {

    armame.game(req.params.name).then(function(juego) {
        console.log(JSON.stringify(juego))
        res.json(juego)
    }).catch(function(error) {
        res.json({})
        console.log(error)
    })

});

router.post('/games/search', function(req, res) {
    var str = req.body.word;

    armame.search(str).then(function(nombres) {
        console.log(JSON.stringify(nombres))
        res.json(nombres)
    }).catch(function(error) {
        res.json([])
        console.log(error)
    })
});

module.exports = router;

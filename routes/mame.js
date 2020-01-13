const express = require('express');
const router = express.Router();

const mame = require('../models/armame')

const armame = new mame()

armame.Open()

router.get('/gamesv3', function(req, res) {
    
    armame.GamesMemory().then(function(nombres) {
        res.json(nombres)
    }).catch(function(error) {
        res.json([])
        console.log(error)
    })

});

router.get('/gamesv2', function(req, res) {

    armame.GamesDescription().then(function(nombres) {
        res.json(nombres)
    }).catch(function(error) {
        res.json([])
        console.log(error)
    })

});

router.get('/games', function(req, res) {

    armame.Games().then(function(nombres) {
        res.json(nombres)
    }).catch(function(error) {
        res.json([])
        console.log(error)
    })

});

router.get('/games/:name', function(req, res) {

    armame.Game(req.params.name).then(function(juego) {
        console.log(JSON.stringify(juego))
        res.json(juego)
    }).catch(function(error) {
        res.json({})
        console.log(error)
    })

});

module.exports = router;

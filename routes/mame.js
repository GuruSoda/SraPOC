const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mame.sqlite', sqlite3.OPEN_READONLY);

// db.close();

router.get('/gamesv3', function(req, res) {
    
        let vector = []

        db.all("SELECT name from game", vector, (error, rows) => {
            if (error) {
                res.json(["error"])
            } else {
                for (let i=0;i<rows.length;i++) {
                    vector.push(rows[i].name)
                }
            }

            res.json(vector)
        })
});

router.get('/gamesv2', function(req, res) {
    
    let vector = []

    db.serialize(function() {
        db.each("SELECT name, description from game", function(err, row) {
            vector.push({name: row.name, description: row.description})
       }, function(error, total) {
            res.json(vector)
       });
    });
});

router.get('/games', function(req, res) {
    
    let vector = []

    db.serialize(function() {
        db.each("SELECT name from game order by name asc", function(err, row) {
            if (err) res.json([])
            else vector.push(row.name)
        }, function(error, num_rows) {
            if (error) res.json([])
            else res.json(vector)
        });
    })
});

// arreglar para que la llamada sea en cascada
router.get('/gamesv2/:name', function(req, res, next) {

    let juego = {}
    let id_juego = 0

    db.serialize(function() {
        db.get(`
            select g.id_game, g.name, g.description, m.name as 'manufacturer' , s.name as 'sourcefile', romof, cloneof, isbios, isdevice, ismechanical, year, runnable 
            from game g, sourcefile s, manufacturer m 
            where g.name = '${req.params.name}' and m.id_manufacturer = g.manufacturer and s.id_sourcefile = g.sourcefile`, 
            function(err, row) {
                if (err) {
                    res.json('{}')
                    next()
                    return 
                } else {
                    if (!row) {
                        res.json('{}')
                        next()
                        return  
                    } else {
                    juego = row
                    console.log('juego:', juego)
                    id_juego = row.id_game
                    console.log(`id_game: ${id_juego}`)
                    }
                }
        }).all(`
            select r.name, r.size, r.crc, r.sha1, t.text  
            from game g, rom r, game_rom gr, text t 
            where r.id_rom = gr.id_rom and g.id_game = gr.id_game and r.status = t.id_text and g.name = '${req.params.name}'`, 
            function(err, rows) {
                console.log('all: id_game = ', id_juego)
                console.log('all: err = ', err)
                console.log('all: rows = ', rows)
                if (err) {
                    juego.roms = err
                    next()
                    return
                } else
                    juego.roms = rows
            
            res.json(juego)
        });
    })
});

router.get('/games/:name', function(req, res) {

    let juego = {}

    db.serialize(function() {
        db.get(`
            select g.id_game, g.name, g.description, m.name as 'manufacturer' , s.name as 'sourcefile', romof, cloneof, isbios, isdevice, ismechanical, year, runnable 
            from game g, sourcefile s, manufacturer m 
            where m.id_manufacturer = g.manufacturer and s.id_sourcefile = g.sourcefile and g.name = '${req.params.name}'`, 
            function(err, row) {
                if (err) {
                    res.json({})
                } else {
                    if (!row) {
                        res.json({})
                    } else {
                        juego = row
                        
                        db.all(`
                            select r.name, r.size, r.crc, r.sha1, t.text  
                            from game g, rom r, game_rom gr, text t 
                            where r.id_rom = gr.id_rom and g.id_game = gr.id_game and r.status = t.id_text and g.id_game = ${juego.id_game}`, 
                            function(err, rows) {
                                if (err) {
                                    juego.roms = []
                                } else {
                                    juego.roms = rows

                                    console.log(juego)
                        
                                    res.json(juego)
                                }
                            })
                    }
                }
        })
    })
});

module.exports = router;

const config = require('../configs/armame')

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs')
const path = require('path')

class arMame {
    constructor () {
        this._DBFile = ""
    }

    Open(DBFile) {

        if (DBFile)
            this.db = new sqlite3.Database(DBFile, sqlite3.OPEN_READONLY)
        else
            this.db = new sqlite3.Database(config.database, sqlite3.OPEN_READONLY)
    
        return this
    }

    Close() {
        this.db.close();
    }


    // Primera version donde carga todos los nombres a memoria
    GamesMemory() {
        const that = this

        return new Promise(function(resolve, reject) {
            let vector = []

            that.db.all("SELECT name from game", vector, (error, rows) => {
                if (error) {
                    reject(error)
                } else {
                    for (let i=0;i<rows.length;i++) {
                        vector.push(rows[i].name)
                    }
                }
                resolve(vector)
            })
        })
    }

    Games() {

        const that = this

        return new Promise(function (resolve, reject) {
            let nombres = new Array()

            that.db.parallelize(function() {
                that.db.each("SELECT name from game order by name asc", function(err, row) {
                    if (err) reject(err)
                    else nombres.push(row.name)
                }, function(error, num_rows) {
                    if (error) reject(err)
                    else resolve(nombres)
                });
            })
         })
    }

    GamesDescription() {
        const that = this

        return new Promise(function (resolve, reject) {
            let vector = []

            that.db.parallelize(function() {
                that.db.each("SELECT name, description from game", function(err, row) {
                    vector.push({name: row.name, description: row.description})
               }, function(error, total) {
                   if (error) reject(error)
                   else resolve(vector)
               })
            })
        })
    }

    Game(name) {

        const that = this

        return new Promise(function(resolve, reject) {
            let juego = {}

            that.db.parallelize(function() {
                that.db.get(`
                    select g.id_game, g.name, g.description, m.name as 'manufacturer' , s.name as 'sourcefile', romof, cloneof, isbios, isdevice, ismechanical, year, runnable 
                    from game g, sourcefile s, manufacturer m 
                    where m.id_manufacturer = g.manufacturer and s.id_sourcefile = g.sourcefile and g.name = '${name}'`, 
                    function(err, row) {
                        if (err) {
                            reject(err)
                        } else {
                            if (!row) {
                                resolve({})
                            } else {
                                juego = row

//                                that.agregarImagenes (juego)
                                
                                that.db.all(`
                                    select r.name, r.size, r.crc, r.sha1, t.text  
                                    from game g, rom r, game_rom gr, text t 
                                    where r.id_rom = gr.id_rom and g.id_game = gr.id_game and r.status = t.id_text and g.id_game = ${juego.id_game}`, 
                                    function(err, rows) {
                                        if (err) {
                                            juego.roms = []
                                        } else {
                                            juego.roms = rows
    
                                            resolve(juego)
                                        }
                                    })
                            }
                        }
                })
            })
        })
    }

/*
// estaba en las rutas
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
*/

    static instance(database) {
        return new arMame(database)
    }

    agregarImagenes (juego) {
        if (!juego) return 

        let ruta = path.join(config.snap, juego.name + '.jpg')

        console.log(ruta)

        if (fs.existsSync(ruta)) {
            juego.snap = ruta
        }
    }
}

module.exports = arMame

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../mame.sqlite', sqlite3.OPEN_READONLY);

function ejecutar() {
    const a = new Promise((resolve, reject) => {
        let vector = []

        db.each("SELECT name, description from game", function(err, row) {
            if (err) 
                reject(err)
            else 
                vector.push(row.name)
        }, function(error, num_rows) {
            resolve(vector)
        });
    })

    a.then(function(res) {
        console.log('Total Registros:' + res.length)
        console.log(res)

    })
}

async function ejecutarV2() {
    return new Promise((resolve, reject) => {
        let vector = []

        db.each("SELECT name, description from game", function(err, row) {
            if (err) 
                reject(err)
            else 
                vector.push(row.name)
        }, function(error, num_rows) {
            resolve(vector)
        });
    })
}

// ejecutar()

ejecutarV2().then(function(res) {
        console.log('Total Registros:' + res.length)
        console.log(res)
})

// ejecutar().then(function(res) {
//     console.log(res)
// })

console.log('Cerrando!')

db.close()

// console.log(vector)

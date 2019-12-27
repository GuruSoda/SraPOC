const argv = require('minimist')(process.argv.slice(2));
const fetch = require('node-fetch')

let url, nombres

if (argv.url || argv.u) url = argv.url || argv.u

if (!url) {
    ayuda()
    return 1
}

mostrar_juegos(url)

return 0

function sacarListaJuegos(url) {
    return fetch(url)
    .then(rta => rta.json())
    .then(items => {
        nombres = items
    })
}

function sacarJuego(url) {
    return fetch(url)
    .then(rta => rta.json())
    .then(rta => {
        console.log(rta.description)
    })
}

async function mostrar_juegos(host) {
    await sacarListaJuegos(host + 'mame/games')

    for (const juego of nombres) {
        await sacarJuego(host + 'mame/games/' + juego)
    }
}

function ayuda () {
    console.log('Uso\nlistacompelta -u|--url <URL>')
}

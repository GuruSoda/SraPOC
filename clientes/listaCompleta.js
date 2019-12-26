const argv = require('minimist')(process.argv.slice(2));
const mame = require('mame.class')

let url

if (argv.url || argv.u) url = argv.url || argv.u

if (!url) {
    ayuda()
    return 1
}

function ayuda () {
    console.log('Uso\nlistacompelta -u|--url <URL>')
}

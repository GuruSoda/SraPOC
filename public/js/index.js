ejecutandoConsulta = false

class mame {
    constructor() {
        this.nombres = []
    }

    Mostrar() {
        console.log('Nombre:')
        this.nombres.forEach( item => {
            console.log(item)
        })
    }

    get Nombres() {
        return this.nombres
    }

    Cargar() {
     return fetch('mame/games')
     .then(rta => rta.json())
     .then(items => {
        this.nombres = items
        console.log('Cargados ',  items.length, ' Juegos')
     })
    }

    GetJuego(juego) {
        return fetch('mame/games/' + juego)
                .then(rta => rta.json())
                .then(rta => {                    
//                    console.log(rta.description)
                    // juego = rta;
                })
    }

    GetJuegos() {
        this.nombres.forEach(juego => {
            this.GetJuego(juego)
        })
    }

    async TraerJuegos() {
        for (const juego of this.nombres) {
            await this.GetJuego(juego)
        }
    }
}

async function onListaCompleta() {

    let armame = new mame()
    
    // trae la lista de juegos.
    await armame.Cargar()

//    await armame.TraerJuegos()

    ejecutandoConsulta = true

    document.querySelector('#botonComenzar').classList.add('disabled')
    document.querySelector('#botonCancelar').removeAttribute('hidden')

    let i=0, total=armame.Nombres.length, porcentaje=0, porcentajeActual=0
    let msg=""

    for (const juego of armame.Nombres) {
        if (!ejecutandoConsulta) break

        await armame.GetJuego(juego)

        i++
        msg = i + "/" + total

        porcentaje = (i*100)/total

        document.querySelector('#contador-enviados').innerHTML = msg + ' (' + ~~porcentaje + '%)'

        if (porcentajeActual != porcentaje) {
            porcentajeActual = porcentaje
            document.querySelector('#porcentaje-consulta').style['width'] = ~~porcentajeActual + '%' // style="width: 70%"
        }
    }

    document.querySelector('#botonComenzar').classList.remove('disabled')
    document.querySelector('#botonCancelar').setAttribute('hidden', '');
}

function onCancelarConsulta() {
    ejecutandoConsulta = false
}

/*
var nombres = []

function cargar_nombres() {
    fetch('mame/games')
    .then(rta => rta.json())
    .then(items => {
        console.log(items)
        nombres = items
    })  
}

function GetJuego(juego) {
    return fetch('mame/games/' + juego)
    .then(rta => rta.json())
    .then(rta => {
        console.log(rta)
    })
}

async function TraerJuegos() {
    for (const juego of nombres) {
        await GetJuego(juego)
        console.log(juego);
    }
}
*/

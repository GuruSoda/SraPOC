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

    Cargar() {
     return fetch('mame/games')
     .then(rta => rta.json())
     .then(items => {
//         console.log(items)
        this.nombres = items
        console.log('Cargados ',  items.length, ' Juegos')
     })
    }

    GetJuego(juego) {
        return fetch('mame/games/' + juego)
                .then(rta => rta.json())
                .then(rta => {
                    console.log(rta.description)
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

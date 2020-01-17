class arMameClient {
    
    constructor(vdirmame = '/mame') {

        this._machinesName = []
        this._urlArMame = ""
        this._version = ""

        this._vdirmame = vdirmame
    }

    async open(url) {

        this._urlArMame = url

        const response = await fetch(this._urlArMame + this._vdirmame + '/version')
        const json = await response.json()

        this._version = json.version
    }

    async loadMachineNames() {
        const response = await fetch(this._urlArMame + this._vdirmame + '/games')
        this._machinesName = await response.json()
    }

     async getMachine(game) {
// Otra forma de hacerlo, mas visual:         
//        const response = await fetch(this._urlArMame + this._vdirmame + '/games/' + game)
//        return await response.json()

        return fetch(this._urlArMame + this._vdirmame + '/games/' + game)
                    .then(function(body) {
                        return body.json();
                    }).then(function(json){
                        return json
                    })
     }

     get machines() {
         return this._machinesName
     }
}

/*
nada = async () => {
    mame = new arMameClient()
    mame.open('http://localhost:28275')

    console.log(await mame.loadMachineNames())

    console.log('con await:', await mame.getMachine('gng'))

    console.log('sin await:', mame.getMachine('gng'))
}

nada()
*/
/*
(async () => {
    mame = new arMameClient()
    mame.open('http://localhost:28275')
//    let salida = await mame.getMachine('gng')
    console.log(await mame.getMachine('gng'))
})()
*/

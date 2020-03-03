class arMameClient {
    
    constructor(vdirmame = 'mame') {

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

    async machineNames() {
        const response = await fetch(this._urlArMame + this._vdirmame + '/games')
        return await response.json()
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
                    }).catch(function(error){
                        return error
                    })
     }

     get machines() {
         return this._machinesName
     }

     async buscar(str) {
/*
         // forma normal:
            return fetch(this._urlArMame + this._vdirmame + '/games/search', {
                method: 'POST',
                body: JSON.stringify({ word: str }),
                headers:{ 'Content-Type': 'application/json' }
            }).then(function(body) {
                return body.json()
            }).then(function(json) {
                return json
            })
*/
         // forma moderna:
        let opciones = {
            method: 'POST',
            body: JSON.stringify({ word: str }),
            headers:{ 'Content-Type': 'application/json' }
        }

        const res = await fetch(this._urlArMame + this._vdirmame + '/games/search', opciones)
        return await res.json()
     }
    
     async buscarv2(str) {
        let xmlhttp = new XMLHttpRequest()

        xmlhttp.open("POST", this._urlArMame + this._vdirmame + '/games/search')

        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")

        // se ejecuta cuando finalizo el GET
        xmlhttp.onload = function() {
            if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
                return JSON.parse(xmlhttp.responseText);
            }
        };

        xmlhttp.send(JSON.stringify({ word: str }));
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

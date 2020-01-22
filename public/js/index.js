ejecutandoConsulta = false

async function onListaCompleta() {

    let armame = new arMameClient()
    
    ejecutandoConsulta = true

    document.getElementById('botonComenzar').classList.add('disabled')

    let i=0, total=0, porcentaje=0, porcentajeActual=0
    let msg=""

    // traigo la lista completa de juegos (solo indices)
    let nombres = await armame.machineNames()
    total = nombres.length

    // recorro cada nombre en la lista y se lo consulto a ArMame
    for (const juego of nombres) {
        if (!ejecutandoConsulta) break

        await armame.getMachine(juego)

        i++
        msg = i + "/" + total

        porcentaje = (i*100)/total

        document.getElementById('contador-enviados').innerHTML = msg + ' (' + ~~porcentaje + '%)'

        if (porcentajeActual != porcentaje) {
            porcentajeActual = porcentaje
            document.getElementById('porcentaje-consulta').style['width'] = ~~porcentajeActual + '%' // style="width: 70%"
        }
    }

    document.getElementById('botonComenzar').classList.remove('disabled')
}

function onCancelarConsulta() {
    ejecutandoConsulta = false
}

async function onBuscarJuego() {
    let item = document.getElementById('textoBuscar')

    let armame = new arMameClient()

    let resultado = (await armame.buscar(item.value)).map(function(obj) {
        return `
            <tr>
                <td>${obj.name}</td>
                <td>${obj.description}</td>
                <td>${obj.year}</td>
            </tr>`
    })

    let tabla = tablaResultado(resultado)

    document.getElementById('resultado-busqueda').innerHTML = tabla
}

function tablaResultado(res) {

    let DOMTabla = `
    <table class="striped">
    <thead>
      <tr>
          <th>Nombre</th>
          <th>Descripcion</th>
          <th>Año</th>
      </tr>
    </thead>`

    for (i=0;i<res.length;i++) DOMTabla += res[i]

    DOMTabla += '<tbody></tbody></table>'

    return DOMTabla
}

function reloadHostname() {
    fetch('api/hostname').then(function(data){
        return data.json()
    }).then(function(data){
        document.getElementById('nombreHostname').innerHTML = data.hostname
    })
}

async function onAgregarTarjetasPod(id) {
    let data = await getJSON('api/info')

    let html
    html = '<div class="row" id="infoPOD">'

        html += cardInfoPod('Host Name', data.hostname)
        html += cardInfoPod('Total Memory', data.totalmem)
        html += cardInfoPod('Free Memory', data.freemem)
        html += cardInfoPod('Home Directory', data.homedir)
        html += cardInfoPod('PID', data.pid)
        html += cardInfoPod('Current Directory', data.currenDirectory)
        html += cardInfoPod('Uptime', data.uptime)
        html += cardInfoPod('architecture ', data.arch)

    html += '</div>'

    document.getElementById(id).innerHTML = html

//    document.getElementById('infoPOD').insertAdjacentHTML('beforeend', cardInfoPod('currenDirectory', data.currenDirectory))
}

function cardInfoPod(titulo, dato) {
    let tarjeta = `
            <div class="col s6 m4">
                <div class="card hoverable">
                    <div class="card-title teal lighten-1 left-align white-text" style="border-radius: 2px">
                        <span class="text-darken-3">${titulo}</span>
                    </div>
                    <card class="card-content">
                        <span class="left-align left truncate text-darken-3">${dato}</span>
                    </card>
                </div>
            </div>`

 //   return document.createElement(tarjeta)
    return tarjeta
}

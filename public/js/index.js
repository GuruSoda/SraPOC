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

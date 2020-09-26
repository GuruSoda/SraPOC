var conexiones = { hosts: [], peticiones: 0 }
var midiendo=false

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('botonDetener').classList.add('disabled')

    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
})

function existe_hostname(hostname) {
    var i;

    for (i=0;i<conexiones.length;i++) if (conexiones[i].hostname === hostname) return i

    return 0
}

function agregar_conexion_a_host(hostname) {
    var i;

    conexiones.peticiones++

    for (i=0;i<conexiones.hosts.length;i++) {
        if (conexiones.hosts[i].hostname === hostname) {
            conexiones.hosts[i].pedidos++

            return 
        }
    }

    var endpoint = {}

    endpoint.hostname = hostname
    endpoint.pedidos = 1

    conexiones.hosts.push(endpoint)
}

function getJSONV0(url) {
    var xhttp= new XMLHttpRequest();
    try {
      xhttp.onreadystatechange = function() {
        console.log(xhttp);
        if (xhttp.readyState == 4 && xhttp.status == 0) {
          alert("Unknown Error Occured. Server response not received.");
        }
      };
      xhttp.open("POST", "http://localhost:8080/data", true);
      xhttp.send();
    } catch(e) {
        console.log('catch', e);
    }
}

async function getJSON(url) {
//    const response = await fetch(url)
//    return response.json()

    return await fetch(url)
        .then(function(response) { 
            return response.json()
        }).then(function(json) {
            return json
        }).catch(function(error) {
//            console.log('Error en getjson:', error)
            // return new Promise((resolve, reject) => resolve({ hostname: 'Error'}))
            return { hostname: 'Error (' + error + ')'}
        });
}

async function onComenzar() {

    document.getElementById('botonComenzar').classList.add('disabled')
    document.getElementById('botonLimpiar').classList.add('disabled')
    document.getElementById('botonDetener').classList.remove('disabled')
    document.getElementById("tipoConsulta").disabled = true
    document.getElementById('cortarConexion').setAttribute('disabled', 'disabled')

    var url = ''

    var e = document.getElementById("tipoConsulta").value

    if (e === 'local') url = '../api/hostname'
    else if (e === 'svc') url = '../api/hostnamesvc'
    else url = '../api/hostname'

    if (document.getElementById('cortarConexion').checked)
        url += '?cortar=si'

    midiendo = true

    while (midiendo) {
//         let data = await getJSON('http://192.168.1.75:31013/api/hostname')
        let data = await getJSON(url)

//        console.log(data)

         agregar_conexion_a_host(data.hostname)

         document.getElementById('totalReq').innerHTML = conexiones.peticiones

         refrescar_tabla()
    }
}

function refrescar_tabla() {
    var i;

    for (i=0;i<conexiones.hosts.length;i++) {
        var element = document.getElementById(conexiones.hosts[i].hostname)

        if (element) {
            document.getElementById(conexiones.hosts[i].hostname + '.pedidos').innerHTML = conexiones.hosts[i].pedidos
            document.getElementById(conexiones.hosts[i].hostname + '.porcentaje').innerHTML = Math.trunc((conexiones.hosts[i].pedidos*100)/conexiones.peticiones) + ' %'
        } else {
            var tr = document.createElement('tr')
            tr.setAttribute('id', conexiones.hosts[i].hostname)

            var registro = `
            <td>${conexiones.hosts[i].hostname}</td>
            <td id="${conexiones.hosts[i].hostname}.pedidos">${conexiones.hosts[i].pedidos}</td>
            <td id="${conexiones.hosts[i].hostname}.porcentaje">${Math.trunc((conexiones.hosts[i].pedidos*100)/conexiones.peticiones)} %</td>
            <td> <a href="javascript:onReset('${conexiones.hosts[i].hostname}')" ><i class="material-icons">check</i></a><a href="javascript:onBorrar('${conexiones.hosts[i].hostname}')"><i class="material-icons">delete</i></a></td>`
            tr.innerHTML = registro

            document.getElementById('cuerpoTabla').appendChild(tr)
        }
    }
}

function onReset(hostname) {
    var i;

    for (i=0;i<conexiones.hosts.length;i++) 
        if (conexiones.hosts[i].hostname === hostname) {
            conexiones.peticiones -= conexiones.hosts[i].pedidos
            conexiones.hosts[i].pedidos = 0
            break
        }

}

function onBorrar(hostname) {
    var i;

    for (i=0;i<conexiones.hosts.length;i++) {
        if (conexiones.hosts[i].hostname === hostname) {
            conexiones.peticiones -= conexiones.hosts[i].pedidos
            conexiones.hosts[i].pedidos = 0
            conexiones.hosts.splice(i, 1)
            break
        }
    }

    var element = document.getElementById(hostname)

    element.parentNode.removeChild(element);

    onReset(hostname)
}

function onDetener() {
    midiendo = false

    document.getElementById('botonComenzar').classList.remove('disabled')
    document.getElementById('botonLimpiar').classList.remove('disabled')
    document.getElementById('botonDetener').classList.add('disabled')
    document.getElementById("tipoConsulta").disabled = false
    document.getElementById('cortarConexion').removeAttribute('disabled')

    console.log(conexiones)
}

function onLimpiar() {
    console.log(conexiones)

    midiendo = false

    document.getElementById('cuerpoTabla').innerHTML = ''

    conexiones.hosts = []
    conexiones.peticiones = 0

    document.getElementById('totalReq').innerHTML = conexiones.peticiones
}

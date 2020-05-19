# SraPOC
La Señora P.O.C, siempre dicen "LA" POC o "LA" Prueba de Concepto, deben hablar de una Señora.

## Que es la Sra. POC?
La Sra. POC es una aplicacion hecha en Javascript que se ejecuta en un entorno de ejecucion de Node.js, 
esta aplicacion expone una serie de API's para poder realizar pruebas de concepto.
El puerto que utiliza en el 28275

## API's que expone la Sra. POC

### Informacion
#### /api
Listado de posibles API's

Salida:

```json
{
"apis": [
    "/",
    "/info",
    "/stdout",
    "/hostname",
    "/falla",
    "/headers"
    ]
}
```

Prueba:
```sh
$ curl http://api.srapoc.com:28275/api | jq
```

#### /api/info
Retorna un objeto JSON con informacion acerca del host que contiene la aplicacion.

Salida:
```json
{
    "env": {
        "PATHEXT": ".COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JSE;.WSF;.WSH;.MSC",
        "PROCESSOR_ARCHITECTURE": "AMD64",
        "PROCESSOR_IDENTIFIER": "Intel64 Family 6 Model 60 Stepping 3, GenuineIntel",
        "PROCESSOR_LEVEL": "6",
        "PROCESSOR_REVISION": "3c03",
        "ProgramData": "C:\\ProgramData",
        "ProgramFiles": "C:\\Program Files",
        "ProgramFiles(x86)": "C:\\Program Files (x86)",
        "ProgramW6432": "C:\\Program Files"
    },
    "pid": 15456,
    "currenDirectory": "C:\\Desarrollo\\SraPOC",
    "hostname": "tecnol083959ln",
    "uptime": 99331,
    "loadavg": [],
    "totalmem": 4203667456,
    "homedir": "C:\\Users\\frossi",
    "Interfaces": {
        "Conexión de área local": [
            {
            "address": "10.64.7.27",
            "netmask": "255.255.255.0",
            "family": "IPv4",
            "mac": "d8:cb:8a:8b:19:e5",
            "internal": false,
            "cidr": "10.64.7.27/24"
            }
        ],
        "Loopback Pseudo-Interface 1": []
    }
}
```

Prueba:
Informacion sobre el host donde esta ejecutandose:
```sh
curl http://api.srapoc.com:28275/api/info | jq
```

La salida tambien es mostrada via STDOUT, sin formatear.

#### /api/hostname
Retorna el nombre del host donde se encuentra ejecutandose

Salida:
```json
{
    "hostname": "tecnol083959ln"
}
```
Prueba:
Informacion sobre el host donde esta ejecutandose:
```sh
curl http://api.srapoc.com:28275/api/hostname | jq
```

La salida tambien es mostrada via STDOUT, sin formatear.

### Envio via POST y salida por stdout

#### /api/stdout
Se envia un POST con un objeto JSON y el mismo objeto es enviado a STDOUT.

Envio de un objeto JSON por POST:
```sh
curl -X POST -H "Content-Type: application/json" -d '{"usuario":"abc","clave":"def"}' http://api.srapoc.com:28275/api/stdout
```

Salida:
```json
{
    "usuario": "abc",
    "clave": "def"
}
```

La salida tambien es mostrada via STDOUT, sin formatear.

#### /api/headers
Retorna en varios formatos el headers del request.
Los parametros pueden ser json,txt,nada.
El default es json.
nada indica sin respuesta, pero con formato json en el stdout del server.

Ejemplo de ejecucion con parametros:
```sh
curl -v http://api.srapoc.com:28275/api/headers?salida=txt
```

### Consultas a base de datos SQLite con informacion acerca del M.A.M.E.

#### /mame/games
Retorna en formato JSON un vector con los nombres de los juegos del emulador M.A.M.E. version 0.216

Ejemplo:
```json
[
    "005",
    "100lions",
    "10yard",
    "10yard85",
    "10yardj",
    "11beat",
    "136094_0072",
    "136095_0072",
    "15lions",
    "18w",
    "18w2",
    "18wheelr",
    "18wheelro",
    "18wheelrt",
    "18wheels",
    "18wheelu",
    "1941"
]
```
Prueba:
```sh
curl http://api.srapoc.com:28275/mame/games | jq
```

#### /mame/gamesv2
Retorna un vector con objetos JSON conteniendo las llaves "nombre" y "description" de cada juego en el M.A.M.E..

Salida:
```json
[
    {
    "name": "gng",
    "description": "Ghosts'n Goblins (World? set 1)"
    },
    {
    "name": "gnga",
    "description": "Ghosts'n Goblins (World? set 2)"
    },
    {
    "name": "gngbl",
    "description": "Ghosts'n Goblins (bootleg with Cross)"
    },
    {
    "name": "gngblita",
    "description": "Ghosts'n Goblins (Italian bootleg, harder)"
    },
    {
    "name": "gngc",
    "description": "Ghosts'n Goblins (World? set 3)"
    },
    {
    "name": "gngprot",
    "description": "Ghosts'n Goblins (prototype)"
    },
    {
    "name": "gngt",
    "description": "Ghosts'n Goblins (US)"
    },
    {
    "name": "gnome",
    "description": "Gnome (070906 Russia)"
    },
    {
    "name": "gnome_10",
    "description": "Gnome (100326 Lottery)"
    },
    {
    "name": "gnome_11",
    "description": "Gnome (100326 Entertainment)"
    }
]
```

Prueba:
```sh
curl http://api.srapoc.com:28275/mame/gamesv2 | jq
```

#### /mame/games/[juego]
Retorna un objeto JSON con informacion del juego pasado por la URL.
A su vez, tambien el objeto retornado es enviado a STDOUT.

Salida:
```json
{
    "id_game": 6856,
    "name": "gng",
    "description": "Ghosts'n Goblins (World? set 1)",
    "manufacturer": "Capcom",
    "sourcefile": "gng.cpp",
    "romof": "",
    "cloneof": "",
    "isbios": 0,
    "isdevice": 0,
    "ismechanical": 0,
    "year": 1985,
    "runnable": 1,
    "roms": [
        {
            "name": "gg4.bin",
            "size": 16384,
            "crc": "66606beb",
            "sha1": "4c640f49be93c7d2b12d4d4c56c56e74099b6c2f",
            "text": "good"
        },
        {
            "name": "gg3.bin",
            "size": 32768,
            "crc": "9e01c65e",
            "sha1": "a87880d87c64a6d61313c3bc69c8d49511e0f9c3",
            "text": "good"
        },
        {
            "name": "gg5.bin",
            "size": 32768,
            "crc": "d6397b2b",
            "sha1": "39aa3cb8c229e60ac0ac410ff61e0c09dba78501",
            "text": "good"
        }
    ]
}
```

Prueba:
```sh
curl http://api.srapoc.com:28275/mame/games/gng | jq
```

### Consulta de todos los Juegos de MAME con el cliente de la Sra. POC:
El cliente "listaCompleta.js" consulta via API REST todos los juegos existentes en la base de datos del M.A.M.E..
La tarea se puede dividir en dos partes, la primera, llama a la API REST que retorna solo los nombres de los juegos ( /mame/games ) y como segunda parte, por cada juego adquirido en la etapa anterior realiza una peticion a la API REST que le retorna toda la informacon sobre el juego (/mame/games/[nombre]), como salida la aplicacion solo muestra la descripcion y en el servidor muestra la informacion completa por STDOUT en formato objeto JSON.

ejecucion:
```json
node clientes/listaCompleta.js -u http://api.srapoc.com:28275/
```

### Pasos para agregar a la Sra. POC en un cluster de openshift
* oc login -u frossi https://console-openshift-console.apps.cltrtecno.bancocredicoop.coop:6443
* oc new-build --name srapoc https://github.com/GuruSoda/SraPOC.git
  * Problemas con el proxy? -> git config --global http.proxyAuthMethod 'basic'
* oc logs -f bc/srapoc -> ver el log
* oc set env bc/srapoc AUTOR=frossi -> agregar una variable de entorno
  * oc set env bc/srapoc --list -> ver las variables de entorno
* oc start-build srapoc -> repetir el proceso de build
* oc new-app srapoc
* oc get pods -> ver las etapas hasta ver donde esta ejecutandose
* oc expose svc/srapoc --port=28275 --> puerto defaul es 8080
* oc edit svc/srapoc --> cambiar el puerto.
* oc scale dc/srapoc --replicas=3 --> cantidad de replicas/pods ejecutandose simultaneamente.
* oc delete all --selector app=srapoc
* oc delete is/srapoc
* oc delete bc/srapoc
* oc get all

#### Problemas con el proxy trabajando con git?
* git config --global http.sslVerify false
* git config --global https.sslVerify false
* git config --global http.proxy http://user:pass@yourproxy:port
* git config --global https.proxy http://user:pass@yourproxy:port
* git config --global http.proxyAuthMethod 'basic'
* git config --global https.proxyAuthMethod 'basic'

#### Preguntas y respuestas
* Como cambiar el puerto y url que expongo?
  * oc delete route srapoc
  * oc expose svc/srapoc --hostname srapoc.apps.cltrtecno.bancocredicoop.coop --port=28275
  * oc edit route srapoc

* Como le pongo balanceo a mi aplicacion?
  * oc set env dc/srapoc ROUTER_LOAD_BALANCE_ALGORITHM=source|roundrobin|leastconn
  * oc set env dc/srapoc ROUTER_TCP_BALANCE_SCHEME=source|roundrobin|leastconn

* Como veo los operadores de un cluster?
* oc get clusteroperator

##### Links interesantes para leer.
Como borrar todos los recursos de una aplicacion
https://cookbook.openshift.org/working-with-resource-objects/how-do-i-delete-all-resource-objects-for-an-application.html

Como configurar load balancer
http://people.redhat.com/jrivera/openshift-docs_preview/openshift-origin/glusterfs-review/architecture/networking/routes.html

##### Gracias por llegar hasta aqui.

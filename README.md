# SraPOC
La Señora P.O.C, siempre dice "LA" POC o "LA" Prueba de Concepto, deben hablar de una Señora.

## Que es la Sra. POC?
La Sra. POC es una aplicacion hecha en Javascript que se ejecuta en un entorno de ejecucion de Node.js, 
esta aplicacion expone una serie de API's para poder realizar pruebas de concepto.
El puerto que utiliza en el 28275

## API's que expone la Sra. POC

### Informacion
* /api
  * Listado de posibles API's
* /api/info
  * Retorna un objeto JSON con informacion acerca del host que contiene la imagen.

### Envio via POST y salida por stdout
* /api/stdout
  * Se envia un POST con un objeto JSON y el mismo objeto es enviado a STDOUT.

### Consultas a base de datos SQLite con informacion acerca del M.A.M.E.
* /mame/games
  * Retorna en formato JSON un vector con los nombres de los juegos del emulador M.A.M.E. 0.216
* /mame/gamesv2
  * Retorna un vector con objetos JSON conteniendo las llaves "nombre" y "description" de cada juego en el M.A.M.E..
* /mame/games/[juego]
  * Retorna un objeto JSON con informacion del juego pasado por la URL

### Ejemplos de uso

Listar las API rest:
```sh
$ curl https://api.srapoc.com:28275/api | jq
```

Informacion sobre el host donde esta ejecutandose:
```sh
curl https://api.srapoc.com:28275/api/info | jq
```

Envio de un objeto JSON por POST:
```sh
curl -X POST -H "Content-Type: application/json" -d '{"username":"abc","password":"abc"}' https://api.srapoc.com:28275/api/stdout
```

#### Consulta de todos los Juegos de MAME con el cliente de la Sra. POC:

Este cliente consulta la lista completa de juegos realizando una consulta REST API uno por uno mostrando por pantalla la descripcion del juego que fue consultado y retornado desde el servidor la informacion completa, donde tambien en el servidor el objeto fue enviado a STDOUT

```json
node clientes/listaCompleta.js -u http://api.srapoc.com:28275/
```

### Ejemplos de respuestas:

/api/info
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
        "VMware Network Adapter VMnet1": [...],
        "VMware Network Adapter VMnet8": [...],
        "Loopback Pseudo-Interface 1": [...]
    }
}
```

/mame/games
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

/mame/games/gng
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

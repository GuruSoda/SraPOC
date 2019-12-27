# SraPOC
La Señora P.O.C ( LA Prueba de Concepto)

## Que es la Sra. POC?
La Sra. POC es una aplicacion hecha en Javascript que se ejecuta en un entorno de ejecucion de Node.js, 
esta aplicacion expone una serie de API's para poder realizar pruebas de concepto en entornos contenerizdos.

## API's que expone la Sra. POC

### Informacion
* /api
  * Listado de posibles API's
* /api/info
  * Retorna un objeto JSON con informacion acerca del host que contiene la imagen.

### Envio via POST y salida por stdout
* /api/stdout
  * Se hace un POST en formato JSON y el mismo objeto es enviado a STDOUT

### Consultas a base de datos SQLite con informacion acerca del M.A.M.E.
* /mame/games
  * Retorna en formato JSON un vector con los nombres de los posibles juegos de MAME 0.216
* /mame/games/[juego]
  * Retorna un objeto JSON con informacion del juego pasado por la URL

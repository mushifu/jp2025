# JP2025
Este proyecto es una aplicación React con Vue y TailwindCSS para el día a día en un viaje a Japón de uso personal.

Incluye varias utilidades externas a la aplicación como tal.


# csvToMarkerJson
**csvToMarkerJson** es un script Python de utilidad auxiliar para el sistema de markers del mapa de la aplicación. La aplicación jp2025 espera tener una serie de ficheros JSON, cada uno representando un *Point of Interest* a visitar durante el viaje y que se mostrarán como marcadores del mapa.

Generar estos JSON a mano es un trabajo tedioso, pero al ser información estructurada no es extraño tenerla reunida en un formato más del día a día, como una tabla Excel. Desde este excel, pudiendo exportar los datos a CSV, simplemente hace falta un script que genere los JSON con los datos originales, que es precisamente lo que hace este script.

Además, incluye funcionalidades como la traducción en tiempo de ejecución de caracteres no ASCII (como kanjis).

## Requisitos previos para la ejecución
Para ejecutar **csvToMarkerJson** es necesario tener instalado Python. Para la traducción, se utiliza la librería translate:
|Paquete| Versión |
|--|--|
| Python | 3.9 |
| pip (viene con python) | 21.2.4 |
| googletrans | 4.0.0-rc1 |

Para instalar el paquete googletrans, ejecutar este comando:

    pip3 install googletrans==4.0.0-rc1
## Ejecutar csvToMarkerJson
Una vez cumplidos los requisitos:

- Situarse en el directorio donde está el script y crear el archivo csv con los datos originales.
- Editar el script csvConverter.py y poner el nombre del csv en la línea 8: `csv_file = "csv_sitiosjap.csv"`
- Abrir un terminal y navegar hasta la ruta donde está el script
- Ejecutar el script con: `python3 csvConverter.py`

Esto generará un directorio "jsons" con todos los documentos JSON asociados.


# Generate-index.js

**generate-index.js** es un script auxiliar para facilitar la gestión de la información de los marcadores del mapa. La aplicación jp2025 espera tener una serie de ficheros JSON, cada uno representando un *Point of Interest* a visitar durante el viaje y que se mostrarán como marcadores del mapa.

Estos marcadores deben estar indexados en un fichero index.json que será el que la aplicación consultará. Generar este índice a mano puede ser una tarea tediosa, con lo que el uso de este script facilitará el proceso. Lo que hace a grandes rasgos es recorrer los ficheros del directorio /public/markers de la aplicación y los lista en un fichero json llamado index.json, generado en la misma carpeta.

## Ejecución de generate-index.js

Para hacer más fácil la tarea de ejecutar el script, se ha incluido este como parte del script de build de la aplicación jp2025.
Simplemente al ejecutar la tarea build del proyecto, se ejecutará también el script:

    npm run build

# Aplicación JP2025

El objetivo de la aplicación es tener a mano todo lo que se pueda necesitar durante el viaje a Japón. Actualmente cuenta con:

- Reloj/Calendario dual Barcelona - GeoLocalización
- Conversor JPY/EUR con actualización automática
- Mapa con ***PoI*** personalizados agrupados por clústeres
- Mapa con estilo minimalista y pocas labels de poca relevancia
- Marcadores con tooltips personalizados
- Funcionalidad de PoI cercanos basados en Geolocalización

## Requisitos para ejecutar la aplicación
Para ejecutar la aplicación es necesario instalar Node.js desde la página oficial.
En un terminal, verificar la instalación de node y npm:

    node -v
    npm -v
Debería devolver algo como esto:

    > node -v
    v22.17.0
    > npm -v
    10.9.2
Instalar el proyecto con:

    npm install
Instalar tailwindcss y sus dependencias:

    npm install -D tailwindcss@3.4.1 postcss autoprefixer
Iniciar tailwindcss:

    npx tailwindcss init -p
Instalar componente de API de Google Maps:

    npm install @react-google-maps/api

## Levantar la aplicación en local
Para levantar un servidor de development con la aplicación en local, ejecutar:

    npm run dev

Si la aplicación lanza un error de vite que tiene que ver con VITE_GOOGLE_MAPS_API_KEY es porque le falta la API key de Google Maps para el mapa. Para incluir una clave de API:

- Crear un fichero ".env" en la raíz del proyecto
- Añadir VITE_GOOGLE_MAPS_API_KEY= < clave-de-api >
- Volver a ejecutar el proyecto



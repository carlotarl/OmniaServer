// Tendrá la conexión a mysql importándola y un logger distinto
const mysql = require('mysql')
const bunyan = require('bunyan')

const logger = bunyan.createLogger({ name: 'Configuracion BD' })

// Creamos la conexión con el siguiente paquete
const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.PORT,
    debug: true,
    connectTimeout: 20000,
})

// Hacemos la estructura try catch para poder parar los errores
try {

    conexion.connect((err) => {
        if (err) {
            logger.info(err)
            throw err;
        }
        logger.info('Conectado a la base de datos satisfactoriamente')
    })

} catch (error) {
    logger.error('Error en la conexion:' + error)

}

// Exportamos la conexion para poder usarla en los controladores
module.exports = conexion;

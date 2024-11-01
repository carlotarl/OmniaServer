// Importamos express cors y bunyan
const express = require ('express')
const cors = require('cors')
const bunyan = require('bunyan')
const path = require('path')
require('dotenv').config();

const serviciosRouter = require('./routes/serviciosRouter')
const usuariosRouter = require('./routes/usuariosRouter')

// Creamos la aplicación de express
const app = express()

// Y también le decimos que vamos a utilizar cors para poder comunicarnos entre nuestros 2 servidores locales (el cliente y el servidor)
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use( express.static( path.join(__dirname,'public') ) )

app.use('/servicios',serviciosRouter)
app.use('/admin',usuariosRouter)


// Para que salga el nombre de nuestro proyecto
console.log(process.env.PORT)
const logger = bunyan.createLogger({name: 'Proyecto Omnia'})

// Le decimos los errores 404 del cliente y 500 del servidor

app.use((req,res)=>{
    res.status(404).json({mensaje:'No se ha encontrado la ruta'})
})

app.use((err,req,res,next)=>{
    res.status(500).json({mensaje:err})
})

// Vamos a escuchar en el puerto 3000 creando una función que nos diga que el servidor está levantado
const puerto = process.env.PORT || 3000;

app.listen(puerto,()=>{
    logger.info('Servidor Levantado')
})
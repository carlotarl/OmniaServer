
// Importamos express y el usuariosController
const express = require('express');
const usuariosController = require('../controller/usuariosController');

// Creamos el router para poder meter las rutas del usuario
const router = express.Router();

// Definimos la ruta para obtener usuarios
router.get('/', usuariosController.getUsuarios);

// Exportamos el router 
module.exports = router;

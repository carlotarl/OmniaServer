// Importamos express y serviciosController
const express = require('express')

const serviciosController = require('../controller/serviciosController')

// Router para ser exportados a otros archivos
const router = express.Router()

router.get('/',serviciosController.getServicios)
router.get('/id',serviciosController.getServiciosById);
router.post('/',serviciosController.newServicios);
router.delete('/',serviciosController.deleteServicios)
router.put('/id',serviciosController.editServiciosById);

module.exports = router;
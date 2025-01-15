// Aquí es donde estarán todas las operaciones que hará mi ruta de Servicios(que hacemos luego en rutas)

// Importamos la conexion de database
const conexion = require('../database');

// Hacemos el controlador (variable que contenga todas las funciones) y la exportamos al final
const serviciosController = {

    getServicios(req, res) {

        let comando = 'SELECT * FROM servicios'

        conexion.query(comando, (err, resultados, campos) => {

            if (err) {
                res.json({ mensaje: 'Error en la consulta' } + err).status(503)
            }
            res.json(resultados).status(200)

        })
    },


    newServicios(req, res) {
        let nombre = req.body.nombre;
        let descripcion = req.body.descripcion;
        let duracion = req.body.duracion;
        let precio = parseInt(req.body.precio);
        let foto = "/"

        let query = "INSERT INTO servicios(nombre,descripcion,duracion,precio,foto) VALUES (?,?,?,?,?)";

        conexion.query(query, [nombre, descripcion, duracion, precio, foto], (err, resultados, campos) => {
            if (err) {
                res.json({ mensaje: 'Error en la insercción' }).status(503)
            }
            res.json({ mensaje: 'Ok' }).status(200)
        })
    },

    deleteServicios(req, res) {

        let id = req.query.id;

        let comando = "SELECT FROM servicios WHERE id = ?";

        conexion.query(comando, [id], (err, resultados, campos) => {
            if (err) {
                res.json({ mensaje: 'Error en el borrado' }).status(503)
            }
            res.json({ mensaje: 'Ok' }).status(200)
        })
    },

    getServiciosById(req, res) {

        let id = req.query.id;

        let comando = "SELECT * FROM servicios WHERE id_servicio = ?";

        conexion.query(comando, [id], (err, resultados, campo) => {
            res.json(resultados[0]).status(200);
        })

    },

    editServiciosById(req, res) {

        let id = req.body.id_servicio;
        let nombre = req.body.nombre;
        let descripcion = req.body.descripcion;
        let duracion = req.body.duracion;
        let precio = req.body.precio;

        let comando = "UPDATE servicios SET nombre = ?, descripcion = ?, duracion = ?, precio = ? WHERE id_servicio = ?"

        conexion.query(comando, [nombre, descripcion, duracion, precio, id], (err, resultados, campo) => {

            if (err) {
                res.json({ mensaje: 'No se ha podido actualizar' }).status(503)
            }
            res.json({ mensaje: 'Ok' }).status(200)

        })


    }


}

module.exports = serviciosController;

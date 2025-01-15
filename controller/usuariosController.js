// Traemos la conexión para poder hacer las operaciones
const conexion = require('../database');

// Creamos el objeto donde estarán todas las funciones y lo exportamos al final
const usuariosController = {
    
    getUsuarios(req, res) {
        let comando = 'SELECT * FROM `admin`';

        conexion.query(comando, (err, resultados) => {
            if (err) {
                return res.status(500).json({ mensaje: 'Error en la consulta get Usuarios' });
            }
            res.status(200).json(resultados);
        });
    },


    checkUsuario(req, res) {
        let usuario = req.query.usuario;
        let contrasena = req.query.contrasena;

        let comando = 'SELECT * FROM admin WHERE nombre = ? AND contrasena = ?'; 

        conexion.query(comando, [usuario,contrasena], (err, resultados) => {
            if (err) {
                return res.status(500).json({ mensaje: 'Error en la consulta checkUsuario' });
            }
            if (resultados.length === 0) {
                return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }
            res.status(200).json(resultados[0]);
        });
    }
};

module.exports = usuariosController;

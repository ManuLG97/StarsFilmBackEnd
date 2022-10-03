import express from 'express';
import { DataTypes } from "sequelize";
import sequelize from "../../loadSequelize.js";
//DEFINICION DEL MODELO: Se define la tabla y sus campos con el tipo de dato, tal cual la base de datos.
const Pelicula = sequelize.define('Pelicula', {
    nombre: DataTypes.STRING,
    director: DataTypes.STRING,
    año_estreno: DataTypes.INTEGER,
    reparto: DataTypes.STRING,
    plataforma: DataTypes.STRING,
    idioma: DataTypes.STRING,
    subtitulos: DataTypes.STRING,
    categoria: DataTypes.STRING,
    categoria2: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    cartelera: DataTypes.BOOLEAN,
    proximo_estreno: DataTypes.BOOLEAN,
    documental: DataTypes.BOOLEAN,
    foto: DataTypes.STRING,
    }, { tableName: 'peliculas', timestamps: false });

const router = express.Router();
// GET lista de todas las peliculas
// vinculamos la ruta /api/alumnes a la función declarada
// si todo ok devolveremos un objeto tipo:
// {ok: true, data: [lista_de_objetos_alumne...]}
// si se produce un error:
// {ok: false, error: mensaje_de_error}
router.get('/', function (req, res, next) {
    sequelize.sync().then(() => {
        Pelicula.findAll()
        .then(peliculas => res.json({
            ok: true,
            data: peliculas
        }))

        .catch(error => res.json({
            ok: false,
            error: error
        }))

    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });
});

// GET de un solo peli mediante id
router.get('/:id', function (req, res, next) {

    sequelize.sync().then(() => {
        Pelicula.findOne({ where: { id: req.params.id } })
    // .then(Alumne => Alumne.get({plain: true}))
        .then(Pelicula => res.json({
            ok: true,
            data: Pelicula
        }))
        
    .catch(error => res.json({
        ok: false,
        error: error
    }))

    }).catch((error) => {
    res.json({
        ok: false,
        error: error
    })
    });
});


// POST, creació d'un nou alumne
router.post('/', function (req, res, next) {

    sequelize.sync().then(() => {
        Pelicula.create(req.body)

        .then((item) => res.json({ ok: true, data: item }))

        .catch((error) => res.json({ ok: false, error }))
        }).catch((error) => {
            res.json({
                ok: false,
                error: error
            })
    });
});

// put Update de toda la vida
router.put('/:id', function (req, res, next) {
    sequelize.sync().then(() => {
        Pelicula.findOne({ where: { id: req.params.id } })
        .then((al) =>
        al.update(req.body)
        )

        .then((ret) => res.json({
            ok: true,
            data: ret
        }))

        .catch(error => res.json({
            ok: false,
            error: error
        }));

        }).catch((error) => {
        res.json({
            ok: false,
            error: error

        })
        });
});

// DELETE elimina l'alumne id
router.delete('/:id', function (req, res, next) {
    sequelize.sync().then(() => {
        Pelicula.destroy({ where: { id: req.params.id } })

        .then((data) => res.json({
             ok: true,
             data 
            }))

        .catch((error) => res.json({
             ok: false,
             error 
            }))})

        .catch((error) => {
            res.json({
                ok: false,
                error: error
            })
    });
});

export default router;
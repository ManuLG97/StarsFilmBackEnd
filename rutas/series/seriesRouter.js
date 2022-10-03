import express from 'express';
import { DataTypes } from "sequelize";
import sequelize from "../../loadSequelize.js";
//DEFINICION DEL MODELO: Se define la tabla y sus campos con el tipo de dato, tal cual la base de datos.
const Serie = sequelize.define('Serie', {
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
    estreno: DataTypes.BOOLEAN,
    proximo_estreno: DataTypes.BOOLEAN,
    documental: DataTypes.BOOLEAN,
    foto: DataTypes.STRING
    }, { tableName: 'series', timestamps: false });

const router = express.Router();

router.get('/', function (req, res, next) {
    sequelize.sync().then(() => {
        Serie.findAll()
        .then(series => res.json({
            ok: true,
            data: series
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

router.get('/:nombre', function (req, res, next) {

    sequelize.sync().then(() => {
        Serie.findOne({ where: { nombre: req.params.nombre } })
    // .then(Alumne => Alumne.get({plain: true}))
        .then(Serie => res.json({
            ok: true,
            data: Serie
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

router.post('/', function (req, res, next) {

    sequelize.sync().then(() => {
        Serie.create(req.body)

        .then((item) => res.json({ ok: true, data: item }))

        .catch((error) => res.json({ ok: false, error }))
        }).catch((error) => {
            res.json({
                ok: false,
                error: error
            })
    });
});

router.put('/:nombre', function (req, res, next) {
    sequelize.sync().then(() => {
        Serie.findOne({ where: { nombre: req.params.nombre } })
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

router.delete('/:nombre', function (req, res, next) {
    sequelize.sync().then(() => {
        Serie.destroy({ where: { nombre: req.params.nombre } })

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
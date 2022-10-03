import express from 'express';
import { DataTypes } from "sequelize";
import sequelize from "../../loadSequelize.js";
//DEFINICION DEL MODELO: Se define la tabla y sus campos con el tipo de dato, tal cual la base de datos.
const Serie = sequelize.define('Serie', {
    nombre: DataTypes.STRING,
    año_estreno: DataTypes.INTEGER,
    plataforma: DataTypes.STRING,
    idioma: DataTypes.STRING,
    subtitulos: DataTypes.STRING,
    categoria: DataTypes.STRING,
    categoria2: DataTypes.STRING,
    descripcion: DataTypes.STRING
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

    router.get('/:plataforma', function (req, res, next) {

        sequelize.sync().then(() => {
            Serie.findAll({ where: { plataforma: req.params.plataforma } })
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

export default router;

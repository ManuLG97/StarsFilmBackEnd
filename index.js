//importamos express y controladores
import express from "express";
import indexRouter from './rutas/indexRouter.js';
import pelisRouter from './rutas/pelis/pelisRouter.js';
import seriesRouter from './rutas/series/seriesRouter.js';
import platRouter from './rutas/series/platRouter.js';
// import platRouter from './rutas/pelis/platRouter.js';
import cors from 'cors';


//instanciamos nueva aplicación express
const app = express();
//necesario para poder recibir datos en json (requiere instalacion "npm install express --save")
app.use(express.json());
//Necesario para evitar la seguridad de intercambio de datos con la bbdd (requiere instalacion "npm install cors")
app.use(cors());
//las rutas que empiecen por /api/pelis se dirigirán a pelisRouter
app.use('/', indexRouter);
app.use('/api/pelis', pelisRouter);
app.use('/api/series', seriesRouter);
// app.use('/api/platSerie', platRouter);


//arranque del servidor
const port = 3001;
app.listen(port, () => console.log(`App listening on port ${port}!`));


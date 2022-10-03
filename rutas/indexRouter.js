import express from 'express';

const router = express.Router();

router.get('/', function (req, res, next) {
    res.end("StarsFilm Backend: /api/pelis");
});

export default router;
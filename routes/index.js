const router = require('express').Router();
const apiUsuarioRouter = require('./api/usuarios.js');
const apiCategoriaRouter = require('./api/categorias');
const apiArticuloRouter = require('./api/articulo');

router.use('/usuario',apiUsuarioRouter);
router.use('/categoria',apiCategoriaRouter);
router.use('/articulo',apiArticuloRouter);
module.exports = router;


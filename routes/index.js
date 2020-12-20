const router = require('express').Router();
const apiUsuarioRouter = require('./api/usuarios.js')

router.use('/usuario', apiUsuarioRouter);



module.exports = router;
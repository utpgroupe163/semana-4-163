const router = require('express').Router();
const usuarioController = require('../../controllers/UserController.js');
const auth = require('../../middlewares/auth.js')


router.post('/login', usuarioController.login);
router.put('/update',auth.verificarAdministrador, usuarioController.actualizar)
router.get('/list', auth.verificarVendedor, usuarioController.listar)
router.post('/add',auth.verificarAdministrador, usuarioController.register)
router.put('/activate',auth.verificarAdministrador, usuarioController.activar)
router.put('/deactivate', auth.verificarAdministrador, usuarioController.desactivar)

module.exports = router;
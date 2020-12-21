const router = require('express').Router();
const usuarioController = require('../../controllers/UserControllers.js');
const auth = require('../../middlewares/auth.js')

router.post('/login',usuarioController.login);
router.post('/register',auth.verificarAdministrador,usuarioController.register);
router.get('/list',auth.verificarAdministrador,usuarioController.list);
router.put('/update',auth.verificarAdministrador,usuarioController.update);

module.exports = router;


const router = require('express').Router();
const articuloController = require('../../controllers/ArticuloControllers');
const auth =require('../../middlewares/auth')


router.post('/add',auth.verificarAlmacenero,articuloController.add);
router.get('/list',auth.verificarAlmacenero,articuloController.list);
router.put('/update',auth.verificarAlmacenero,articuloController.update);
router.put('/activate',auth.verificarAlmacenero,articuloController.activate);
router.put('/deactivate',auth.verificarAlmacenero,articuloController.deactivate);
module.exports = router;


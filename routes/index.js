var express = require('express');
var router = express.Router();
const mainController = require('../controllers/mainController')

/* GET home page. */
router.get('/', mainController.index);

router.get('/crearEvento', mainController.crearEvento);

router.get('/features', mainController.features);

router.get('/partners', mainController.partners);

router.get('/login', mainController.login);

router.get('/registro', mainController.registro);
router.post('/registro', mainController.store);

module.exports = router;

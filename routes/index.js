var express = require('express');
var router = express.Router();
const mainController = require('../controllers/mainController')
const prodController = require('../controllers/prodController')

/* GET home page. */
router.get('/', mainController.index);
router.get('/index', mainController.index);

router.get('/crearEvent', prodController.crearEvento);

router.get('/miProductora/id/:id', prodController.miProductora);

router.get('/features', mainController.features);

router.get('/partners', mainController.partners);

router.get('/login', mainController.login);
router.post('/login', mainController.loginPost);
router.get('/logout', mainController.logout);

router.get('/registro', mainController.registro);
router.post('/registro', mainController.store);

module.exports = router;

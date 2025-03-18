var express = require('express');
var router = express.Router();
var fotosController = require('../controllers/fotosController');

const { Sequelize, Op } = require('sequelize');

router.get('/findAll/json', fotosController.findAllJson);
router.get('/findAll/view', fotosController.findAllView);
router.get('/findAllByRate/json', fotosController.findAllByRateJson);
router.get('/fotosPorRango', fotosController.mostrarFotosPorRango);

module.exports = router;
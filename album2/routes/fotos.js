var express = require('express');
var router = express.Router();
var fotosController = require('../controllers/fotosController');

router.get('/findAll/json', fotosController.findAllJson);
router.get('/findAll/view', fotosController.findAllView);

module.exports = router;
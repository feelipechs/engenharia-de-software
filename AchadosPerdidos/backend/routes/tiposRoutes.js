const express = require('express');
const router = express.Router();
const controller = require('../controllers/tiposController');

router.get('/', controller.getTipos);
router.post('/', controller.createTipo);

module.exports = router;

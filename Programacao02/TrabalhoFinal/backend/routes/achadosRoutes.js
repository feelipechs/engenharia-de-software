const express = require('express');
const router = express.Router();
const controller = require('../controllers/achadosController');

router.get('/', controller.getAchados);
router.post('/', controller.createAchado);
router.delete('/:id', controller.deleteAchado);

module.exports = router;

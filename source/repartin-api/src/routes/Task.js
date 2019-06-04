var express = require('express');
var router = express.Router();
var controller = require('../controller/TaskController.js');


router.post('/task', controller.create);
router.get('/task/:id', controller.getById);
router.get('/task', controller.getById);
router.put('/task/:id', controller.updateById);
router.get('/task/house/:id', controller.getByHouse);
router.delete('/task/:id', controller.deleteById);

module.exports = router;
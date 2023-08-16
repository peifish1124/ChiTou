const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const scheduleController = require('../controllers/schedule_controller');

router.post('/', userController.authorization, scheduleController.create);
router.put('/sequence', userController.authorization, scheduleController.changeSequence);
router.put('/:id', userController.authorization, scheduleController.update);
router.delete('/:id', userController.authorization, scheduleController.delete);

module.exports = router;
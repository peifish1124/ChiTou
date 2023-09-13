const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const eventController = require('../controllers/event_controller');

router.get('/', userController.authorization, eventController.getEvents);
router.put('/:event_id/read', userController.authorization, eventController.read);

module.exports = router;
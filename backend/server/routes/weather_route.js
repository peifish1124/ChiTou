const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weather_controller');
const userController = require('../controllers/user_controller');

router.get('/', userController.authorization, weatherController.getWeather);

module.exports = router;
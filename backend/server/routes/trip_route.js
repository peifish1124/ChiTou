const express = require('express');
const router = express.Router();
const tripController = require('../controllers/trip_controller');

router.post('/', tripController.createTrip);

module.exports = router;
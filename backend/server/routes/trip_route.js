const express = require('express');
const router = express.Router();
const tripController = require('../controllers/trip_controller');
const userController = require('../controllers/user_controller');
const tripUtil = require('../../utils/trip_util');

router.post('/', userController.authorization, tripController.createTrip);
router.get('/', userController.authorization, tripController.getTrips);
router.get('/search', userController.authorization, tripController.search);
router.get('/:id', userController.authorization, tripController.tripDetail);
router.put('/:id/picture', userController.authorization, tripUtil.uploadPicture().single('picture'), tripController.uploadPicture);
router.put('/:id/days/:trip_day/sequence', userController.authorization, tripController.changeSequence);

module.exports = router;
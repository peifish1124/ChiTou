const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search_controller');
const userController = require('../controllers/user_controller');

router.get('/', userController.authorization, searchController.getGoogleSearch);

module.exports = router;
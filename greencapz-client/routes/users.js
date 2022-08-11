var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController');


router.get('/', user_controller.index);

router.get('/dashboard', user_controller.user_dashboard);

module.exports = router;

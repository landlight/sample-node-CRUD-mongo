var healthCheckController = require('../controllers/healthCheckController');

var express = require('express');
var router = express.Router();

router.route('/healthcheck')
      .get(healthCheckController.healthCheck);

module.exports = router;
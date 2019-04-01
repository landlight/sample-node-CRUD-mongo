//test route for just checking the database connection
var sampleController = require('../controllers/sampleController');

var express = require('express');
var router = express.Router();

router.route('/sample/create')
      .post(sampleController.create);

router.route('/sample/read')
    .get(sampleController.find);

router.route('/sample/update/:sample_id')
    .put(sampleController.update);

router.route('/sample/delete/:sample_id')
    .delete(sampleController.remove);

module.exports = router;
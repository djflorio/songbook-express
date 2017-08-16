var express = require('express');
var router = express.Router();

var song_controller = require('../controllers/songController');

//router.get('/', song_controller.index);

router.get('/:id', song_controller.song_detail);

router.get('/', song_controller.song_list);

module.exports = router;
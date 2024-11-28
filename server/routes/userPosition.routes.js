const express = require('express');
const { getUserPosition,createUserPosition } = require('../controllers/userPosition.controllers');
const router = express.Router();



router.get('/getPosition',getUserPosition)
router.post('/createPosition',createUserPosition)

module.exports = router;
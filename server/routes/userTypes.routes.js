const express = require('express');
const { gettingUserType } = require('../controllers/userType.controllers');
const router = express.Router();

router.get("/getUserType",gettingUserType);

module.exports = router;